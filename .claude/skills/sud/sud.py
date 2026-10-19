#!/usr/bin/env python3
"""Учёт для скилла sud: суд над идеей перед присяжными из Claude.

Оркестратор скилла (Claude) ведёт суд этими командами. Каждый суб-агент читает задание, которое
пишет этот скрипт, и пишет один файл с ответом. Скрипт проверяет файлы, считает голоса и собирает
вердикт. Всё состояние лежит в .sud/<запуск>/ в текущей папке.

    python3 sud.py plan [--jury N | --quick]
    python3 sud.py init --case-file PATH [--jury N | --quick] [--seed S]
    python3 sud.py next
    python3 sud.py prompts <phase>
    python3 sud.py check <phase>
    python3 sud.py tally
    python3 sud.py render

Фазы по порядку: opening (вступительные речи), rebuttal (ответные речи), jury (присяжные),
judge (судья). Названия фаз, имена файлов и ключи в tally.json остались английскими: это код.
"""
import argparse
import json
import os
import random
import re
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.environ.get("SUD_ROOT", ".sud")  # portfolio: SUD_ROOT=.sud/<case> runs trials side by side
LATEST = os.path.join(ROOT, "LATEST")
PHASES = ["opening", "rebuttal", "jury", "judge"]
DEFAULT_JURY = 12
QUICK_JURY = 6
WAVE = 6
CREDIT = ("_Основано на [court-skill](https://github.com/alexyc9381/court-skill) Alex Chen "
          "([@nocodealex](https://instagram.com/nocodealex)). Русская версия: Ержан (@mrconsol)._")
CHARGE = "Идея не выдерживает проверки в том виде, как её описали: идти с ней дальше так не стоит."

GUILTY = "ВИНОВНА"
NOT_GUILTY = "НЕВИНОВНА"
HUNG = "ПРИСЯЖНЫЕ НЕ СОШЛИСЬ"
NO_VOTE = "НЕТ ГОЛОСА"


# ---------- состояние ----------

def load_jurors():
    with open(os.path.join(HERE, "jurors.json"), encoding="utf-8") as f:
        return json.load(f)


def run_dir():
    if not os.path.exists(LATEST):
        sys.exit("sud: суда ещё нет. Запусти: sud.py init --case-file .sud/case.md")
    with open(LATEST, encoding="utf-8") as f:
        return f.read().strip()


def load_state(rd=None):
    rd = rd or run_dir()
    with open(os.path.join(rd, "state.json"), encoding="utf-8") as f:
        return json.load(f)


def save_state(state):
    with open(os.path.join(state["dir"], "state.json"), "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)


def jury_size(args):
    if getattr(args, "quick", False):
        return QUICK_JURY
    n = getattr(args, "jury", None) or DEFAULT_JURY
    if n < 3 or n > 12:
        sys.exit("sud: присяжных должно быть от 3 до 12")
    return n


# ---------- задания ----------

def jobs(state, phase):
    """Каждое задание: id, путь к заданию, путь к ответу."""
    d = state["dir"]
    if phase in ("opening", "rebuttal"):
        ids = ["prosecution", "defense"]
    elif phase == "jury":
        ids = ["juror-%02d" % (i + 1) for i in range(len(state["jury"]))]
    elif phase == "judge":
        ids = ["judge"]
    else:
        sys.exit("sud: неизвестная фаза %r (фазы: %s)" % (phase, ", ".join(PHASES)))
    out = []
    for jid in ids:
        out.append({
            "id": jid,
            "brief": os.path.abspath(os.path.join(d, "briefs", "%s-%s.md" % (phase, jid))),
            "output": os.path.abspath(os.path.join(d, phase, "%s.md" % jid)),
        })
    return out


def done(job):
    p = job["output"]
    return os.path.exists(p) and os.path.getsize(p) > 0


def missing(state, phase):
    return [j for j in jobs(state, phase) if not done(j)]


# ---------- задания для суб-агентов ----------

def _abs(state, *parts):
    return os.path.abspath(os.path.join(state["dir"], *parts))


ROLE = {"prosecution": "ПРОКУРОР", "defense": "АДВОКАТ"}


def brief_text(state, phase, job):
    case = _abs(state, "case.md")
    head = ("Ты часть судебного процесса, который ведёт скилл sud. Разговора с пользователем ты не видишь: "
            "всё, что ты знаешь, лежит в файлах, названных ниже. Опирайся только на материалы дела. "
            "Не выдумывай факты, цифры, цитаты и источники. Если в материалах чего-то нет, так и скажи: "
            "чего не хватает и почему это важно. Пиши по-русски, простым языком, без канцелярита. "
            "Запиши ответ строго в этот файл и больше никуда:\n\n    %s\n\n"
            "Обвинение: %s\n\nМатериалы дела: %s\n\n" % (job["output"], CHARGE, case))
    if phase == "opening":
        if job["id"] == "prosecution":
            return head + (
                "Ты ПРОКУРОР. Построй самое сильное честное обвинение: докажи, что обвинение верно.\n\n"
                "- От 3 до 5 пронумерованных пунктов. В каждом: один конкретный способ, которым идея "
                "проваливается, доказательство из материалов дела (процитируй его) и во что это обойдётся, "
                "если обвинение верно.\n"
                "- Атакуй идею в том виде, как её написал пользователь, а не ослабленную версию.\n"
                "- Без оскорблений, без оговорок, без похвал. Не больше 350 слов.\n")
        return head + (
            "Ты АДВОКАТ. Построй самую сильную честную защиту: докажи, что обвинение НЕ верно и с идеей "
            "стоит идти дальше в том виде, как она описана.\n\n"
            "- От 3 до 5 пронумерованных пунктов. В каждом: одна конкретная сильная сторона, "
            "доказательство из материалов дела (процитируй его) и почему она перевешивает самое "
            "очевидное возражение.\n"
            "- Защищай идею в том виде, как её написал пользователь. Если какую-то часть защитить "
            "нельзя, признай это одной строкой, а не выкручивайся.\n- Не больше 350 слов.\n")
    if phase == "rebuttal":
        side, other = ("prosecution", "defense") if job["id"] == "prosecution" else ("defense", "prosecution")
        return head + (
            "Ты %s. Прочитай вступительную речь другой стороны:\n\n    %s\n\n"
            "Ответь на каждый её пункт по порядку: выдержал ли он проверку и почему, по одному-два "
            "предложения на пункт. Затем назови один пункт, по которому присяжным стоит принять решение. "
            "Не больше 250 слов.\n"
            % (ROLE[side], _abs(state, "opening", other + ".md")))
    if phase == "jury":
        idx = int(job["id"].split("-")[1]) - 1
        juror = state["jury"][idx]
        record = "\n".join("    " + _abs(state, p, s + ".md")
                           for p in ("opening", "rebuttal") for s in ("prosecution", "defense"))
        return head + (
            "Ты ПРИСЯЖНЫЙ %d из %d: %s. %s\n\n"
            "Прочитай материалы дела и все четыре речи:\n\n%s\n\n"
            "Решай сам: других присяжных ты не увидишь. Ты ничего не должен ни идее, ни её автору. "
            "Голосовать «за» из доброты или «против», чтобы выглядеть строгим, значит проявить неуважение "
            "к суду. Суди глазами своей роли, как она описана выше.\n\n"
            "Напиши ровно эти четыре строки и больше ничего:\n\n"
            "ГОЛОС: ВИНОВНА или НЕВИНОВНА\n"
            "ПРИЧИНА: одно предложение, своим голосом\n"
            "РЕШАЮЩИЙ ФАКТ: один факт из материалов, который решил дело\n"
            "ГОЛОС ИЗМЕНИТСЯ, ЕСЛИ: одно изменение в деле, после которого твой голос стал бы противоположным\n"
            % (idx + 1, len(state["jury"]), juror["name"], juror["lens"], record))
    if phase == "judge":
        return head + (
            "Ты СУДЬЯ. Присяжные проголосовали, и отменить их голоса ты не можешь. Прочитай материалы дела, "
            "четыре речи в %s и %s, голоса всех присяжных в %s и подсчёт в %s.\n\n"
            "Напиши эти разделы просто, для человека, который ни разу не был в суде. Обращайся к нему на «ты»:\n\n"
            "## Обвинения, которые устояли\nТри возражения, на которые присяжные ссылались чаще всего, "
            "каждое одним предложением, с числом присяжных, которые на него опирались.\n\n"
            "## В чём защита права\nДва самых сильных довода в пользу идеи.\n\n"
            "## Условия оправдания\nТри конкретных изменения, которые перевернули бы больше всего голосов. "
            "Собери их из строк «ГОЛОС ИЗМЕНИТСЯ, ЕСЛИ». Каждое должно быть тем, что человек может сделать "
            "на этой неделе.\n\n"
            "## Приговор\nОдин короткий абзац голосом судьи: что человеку делать дальше.\n\n"
            "Не больше 250 слов. Счёт голосов не повторяй: он напечатан над твоим решением.\n"
            % (_abs(state, "opening"), _abs(state, "rebuttal"), _abs(state, "jury"),
               _abs(state, "tally.json")))
    raise ValueError(phase)


# ---------- голоса ----------

VOTE_RE = re.compile(r"^\s*\**ГОЛОС\**\s*:\s*\**\s*(НЕ\s*ВИНОВ\w*|ВИНОВ\w*)", re.I | re.M)
FIELD_RE = r"^\s*\**%s\**\s*:\s*(.+)$"


def parse_vote(text):
    m = VOTE_RE.search(text or "")
    if not m:
        return None
    vote = NOT_GUILTY if m.group(1).upper().startswith("НЕ") else GUILTY
    out = {"vote": vote}
    for key, name in (("reason", "ПРИЧИНА"), ("fact", "РЕШАЮЩИЙ ФАКТ"), ("flip", "ГОЛОС ИЗМЕНИТСЯ, ЕСЛИ")):
        f = re.search(FIELD_RE % name, text, re.I | re.M)
        out[key] = f.group(1).strip().strip("*").strip() if f else ""
    return out


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def tally(state):
    rows = []
    for j, juror in zip(jobs(state, "jury"), state["jury"]):
        text = read(j["output"]) if done(j) else ""
        v = parse_vote(text)
        rows.append({"juror": juror["name"], "vote": v["vote"] if v else NO_VOTE,
                     "reason": v["reason"] if v else "", "fact": v["fact"] if v else "",
                     "flip": v["flip"] if v else ""})
    guilty = sum(1 for r in rows if r["vote"] == GUILTY)
    not_guilty = sum(1 for r in rows if r["vote"] == NOT_GUILTY)
    if guilty > not_guilty:
        verdict = GUILTY
    elif not_guilty > guilty:
        verdict = NOT_GUILTY
    else:
        verdict = HUNG
    result = {"verdict": verdict, "guilty": guilty, "not_guilty": not_guilty,
              "no_vote": len(rows) - guilty - not_guilty, "jurors": rows}
    with open(os.path.join(state["dir"], "tally.json"), "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    return result


def verdict_line(t):
    if t["verdict"] == HUNG:
        return "%s, %d против %d" % (HUNG, t["guilty"], t["not_guilty"])
    big, small = (t["guilty"], t["not_guilty"]) if t["verdict"] == GUILTY else (t["not_guilty"], t["guilty"])
    return "%s, %d против %d" % (t["verdict"], big, small)


def render(state):
    t = tally(state)
    case = read(os.path.join(state["dir"], "case.md")).strip()
    first = case.splitlines()[0].lstrip("# ").strip() if case else "(пустое дело)"
    judge = jobs(state, "judge")[0]
    judgment = read(judge["output"]).strip() if done(judge) else "_Судья ещё не вынес решение._"
    lines = ["# Вердикт: %s" % verdict_line(t), "",
             "**Дело:** %s" % first, "", "**Обвинение:** %s" % CHARGE, "",
             "## Как проголосовали присяжные", "", "| Присяжный | Голос | Почему |", "|---|---|---|"]
    for r in t["jurors"]:
        lines.append("| %s | %s | %s |" % (r["juror"], r["vote"], r["reason"].replace("|", "/")))
    lines += ["", judgment, "",
              "_Весь процесс лежит в %s: вступительные речи, ответные речи и голоса всех присяжных._"
              % os.path.abspath(state["dir"]), "", CREDIT]
    text = "\n".join(lines) + "\n"
    with open(os.path.join(state["dir"], "ВЕРДИКТ.md"), "w", encoding="utf-8") as f:
        f.write(text)
    return text


# ---------- команды ----------

def cmd_plan(args):
    n = jury_size(args)
    calls = 2 + 2 + n + 1
    print("присяжных: %d. Вызовов суб-агентов: 2 вступительные речи + 2 ответные + %d присяжных + 1 судья = %d"
          % (n, n, calls))


def cmd_init(args):
    n = jury_size(args)
    if not os.path.exists(args.case_file):
        sys.exit("sud: файл дела не найден: %s" % args.case_file)
    case = read(args.case_file).strip()
    if not case:
        sys.exit("sud: файл дела пуст")
    seed = args.seed if args.seed is not None else random.randrange(1, 10 ** 6)
    jurors = load_jurors()
    rng = random.Random(seed)
    jury = jurors[:] if n == len(jurors) else rng.sample(jurors, n)
    rd = os.path.join(ROOT, time.strftime("%Y%m%d-%H%M%S"))
    for sub in ("briefs", "opening", "rebuttal", "jury", "judge"):
        os.makedirs(os.path.join(rd, sub), exist_ok=True)
    with open(os.path.join(rd, "case.md"), "w", encoding="utf-8") as f:
        f.write(case + "\n")
    state = {"dir": rd, "seed": seed, "jury": jury, "created": time.strftime("%Y-%m-%dT%H:%M:%S")}
    save_state(state)
    with open(LATEST, "w", encoding="utf-8") as f:
        f.write(rd)
    print("sud: суд открыт в %s (присяжных: %d, seed %d)" % (rd, n, seed))
    print("дальше: python3 sud.py prompts opening")


def cmd_prompts(args):
    state = load_state()
    todo = missing(state, args.phase)
    for j in jobs(state, args.phase):
        with open(j["brief"], "w", encoding="utf-8") as f:
            f.write(brief_text(state, args.phase, j))
    if not todo:
        print("sud: фаза %s завершена. Запусти: sud.py next" % args.phase)
        return
    for w in range(0, len(todo), WAVE):
        print("волна %d:" % (w // WAVE + 1))
        for j in todo[w:w + WAVE]:
            print("  %s  brief=%s" % (j["id"], j["brief"]))
    print("Запусти по одному вызову Agent на задание, по одной волне за раз. Промпт: "
          "\"Прочитай <brief> и выполни его точно. Это всё твоё задание.\"")


def cmd_check(args):
    state = load_state()
    todo = missing(state, args.phase)
    if not todo:
        print("sud: фаза %s завершена" % args.phase)
    for j in todo:
        print("не хватает: %s -> %s" % (j["id"], j["output"]))


def cmd_next(args):
    state = load_state()
    for phase in PHASES:
        if missing(state, phase):
            if phase == "judge":
                t = tally(state)
                print("sud: присяжные проголосовали: %s." % verdict_line(t))
            print("следующая фаза: %s. Запусти: python3 sud.py prompts %s" % (phase, phase))
            return
    print("sud: суд окончен. Запусти: python3 sud.py render")


def cmd_tally(args):
    state = load_state()
    t = tally(state)
    print(verdict_line(t))


def cmd_render(args):
    state = load_state()
    sys.stdout.write(render(state))


def main(argv=None):
    p = argparse.ArgumentParser(prog="sud.py")
    sub = p.add_subparsers(dest="cmd")
    pl = sub.add_parser("plan")
    pl.add_argument("--jury", type=int)
    pl.add_argument("--quick", action="store_true")
    pi = sub.add_parser("init")
    pi.add_argument("--case-file", required=True)
    pi.add_argument("--jury", type=int)
    pi.add_argument("--quick", action="store_true")
    pi.add_argument("--seed", type=int)
    for name in ("prompts", "check"):
        sp = sub.add_parser(name)
        sp.add_argument("phase", choices=PHASES)
    for name in ("next", "tally", "render"):
        sub.add_parser(name)
    args = p.parse_args(argv)
    if not args.cmd:
        p.print_help()
        return 1
    {"plan": cmd_plan, "init": cmd_init, "prompts": cmd_prompts, "check": cmd_check,
     "next": cmd_next, "tally": cmd_tally, "render": cmd_render}[args.cmd](args)
    return 0


if __name__ == "__main__":
    sys.exit(main())
