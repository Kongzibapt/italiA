import { Status } from '~/types/entities/status';

export const getStatusLabel = (status: Status) => {
  switch (status) {
    case Status.NOT_LEARNED:
      return 'Non maîtrisés';
    case Status.PARTIALLY_LEARNED:
      return 'Partiellement appris';
    case Status.WELL_LEARNED:
      return 'Maîtrisés';
    default:
      return '';
  }
};
