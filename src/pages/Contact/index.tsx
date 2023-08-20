import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import {
  RiExternalLinkFill,
  RiMailCheckFill,
  RiMailFill,
  RiPhoneFill,
} from 'react-icons/ri';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Accordion, Breadcrumbs, Button, CodeEditor } from 'components';
import { Input, Label, TextArea } from 'components/Form';

import { IFormData } from './types';

import './styles.scss';

const Contact = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>();
  const [code, setCode] =
    useState(`const button = document.querySelector('#sendBtn');

const message = {
\tname: "",
\temail: "",
\tmessage: ""
}

button.addEventListener('click', () => {
\tform.send(message);
})`);

  useEffect(() => {
    const subscription = watch(({ name, message, email }) => {
      setCode(
        `const button = document.querySelector('#sendBtn');

const message = {
\tname: "${watch('name') || ''}",
\temail: "${watch('email') || ''}",
\tmessage: "${watch('message') || ''}"
}

button.addEventListener('click', () => {
\tform.send(message);
})`
      );
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = handleSubmit(data => {
    fetch('https://formspree.io/f/xbjvjvpb', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success('Message sent successfully!', {
          icon: RiMailCheckFill,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        reset();
      });
  });
  return (
    <>
      <Helmet>
        <title>Contact me</title>
        <meta
          name="description"
          content="Contact me for exciting opportunities & collaborations! Let's create remarkable web experiences together. Prompt responses guaranteed!"
        />
      </Helmet>
      <div className="contact">
        <div className="contact-drawer drawer">
          <Accordion title="contacts" isOpen>
            <div className="contact-drawer__content">
              <a href="mailto:sergromanenko97@gmail.com">
                <RiMailFill className="icon" />
                <span>sergromanenko97@gmail.com</span>
              </a>
              <a href="tel:+380731055010">
                <RiPhoneFill className="icon" />
                <span>+38(073)1055010</span>
              </a>
            </div>
          </Accordion>
          <Accordion title="find-me-also-in">
            <div className="contact-drawer__content">
              <a
                href="https://www.instagram.com/romanenkosergio"
                target="_blank"
                rel="noreferrer"
              >
                <RiExternalLinkFill className="icon" />
                <span>Instagram account</span>
              </a>
              <a
                href="https://djinni.co/q/6e7150fa46/"
                target="_blank"
                rel="noreferrer"
              >
                <RiExternalLinkFill className="icon" />
                <span>Djinni profile</span>
              </a>
            </div>
          </Accordion>
        </div>
        <div className="contact__content">
          <Breadcrumbs items="contacts" />
          <div className="contact__container page-content">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              closeButton={false}
            />
            <div className="contact__left">
              <form action="" className="contact-form" onSubmit={onSubmit}>
                <Label label={'_name'}>
                  <Input
                    error={errors.name}
                    register={{
                      ...register('name', {
                        required: '_name is required',
                        validate: {
                          minLength: v =>
                            v.length >= 5 ||
                            'The _name should have at least 5 characters',
                          matchPattern: v =>
                            /^[a-zA-Z ]+$/.test(v) ||
                            '_name must contain only letters',
                        },
                      }),
                    }}
                  />
                </Label>
                <Label label={'_email'}>
                  <Input
                    error={errors.email}
                    type="email"
                    register={{
                      ...register('email', {
                        required: '_email is required',
                        validate: {
                          maxLength: v =>
                            v.length <= 50 ||
                            'The _email should have at most 50 characters',
                          matchPattern: v =>
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                              v
                            ) || '_email must be a valid address',
                        },
                      }),
                    }}
                  />
                </Label>
                <Label label={'_message'}>
                  <TextArea
                    error={errors.message}
                    register={{
                      ...register('message', {
                        required: '_message is required',
                      }),
                    }}
                  />
                </Label>
                <Button
                  text="submit-message"
                  buttonType="submit"
                  id="#sendBtn"
                />
              </form>
            </div>
            <div className="contact__right">
              <CodeEditor code={code} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
