import { formatDistanceToNow, parseISO } from 'date-fns';

const formatDateToRelative = (creationDate: string): string => {
  const fileCreationDate = parseISO(creationDate);
  return `Created ${formatDistanceToNow(fileCreationDate, {addSuffix: true})}`;
}

export default formatDateToRelative;
