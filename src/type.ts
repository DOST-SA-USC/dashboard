interface authState {
  error: boolean;
  message: string;
}

type UserRoles = 'admin' | 'faculty' | 'officer' | 'student';

export type { authState, UserRoles };
