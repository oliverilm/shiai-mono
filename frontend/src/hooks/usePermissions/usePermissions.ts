import { useAppSelector } from '../useRedux';
import { ICompetition } from '../../@types/api-types';

interface Permissions {
  canCreateCompetition: boolean;
  canCreateClub: boolean;
  canRegisterJudokas: boolean;
  isLoggedIn: boolean;
  isUnionMember: boolean;
  isClubOwner: boolean;
  isTrainer: boolean;
  isPending: boolean;
  isCompetitionOwner: (e: ICompetition) => boolean;
  isProfileDataFilled: boolean;
}

const usePermissions = (): Permissions => {
  const { user, isLoggedIn } = useAppSelector((s) => s.user);

  const isUnionMember = Boolean(
    user && user.profile.isUnionMember && user.profile.union !== null,
  );
  const isClubOwner = Boolean(user && user.profile.isClubOwner);
  const isTrainer = Boolean(user && user.profile.isTrainer);
  const isPending = Boolean(user && user.profile.pending);
  const isProfileDataFilled = Boolean(
    user &&
      user.profile &&
      user.profile.judoka?.firstName.length > 0 &&
      user.profile.judoka?.lastName.length > 0 &&
      ['M', 'W'].includes(user.profile.judoka?.sex),
  );

  const isCompetitionOwner = (comp: ICompetition): boolean =>
    comp.owner === user?.id;

  const canCreateCompetition = Boolean(
    user &&
      isLoggedIn &&
      user.profile.club !== null &&
      (isTrainer || isClubOwner),
  );

  const canCreateClub = Boolean(
    user && isLoggedIn && user.profile.club === null,
  );
  const canRegisterJudokas = Boolean(
    user &&
      isLoggedIn &&
      user.profile.club !== null &&
      (isTrainer || isClubOwner),
  );

  return {
    canCreateCompetition,
    canCreateClub,
    canRegisterJudokas,
    isLoggedIn,
    isClubOwner,
    isUnionMember,
    isTrainer,
    isPending,
    isProfileDataFilled,
    isCompetitionOwner,
  };
};

export default usePermissions;
