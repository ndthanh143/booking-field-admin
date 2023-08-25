import { Venue } from '../venue/venue.dto';
import { BasePaginationResponse, BaseQuery, BaseResponse } from '@/common/dtos/base.dto';
import { RoleEnum } from '@/common/enums/role.enum';

export type UpdateUserResponse = BaseResponse<User>;
export type UsersResponse = BasePaginationResponse<User>;
export type GetAnalystUserResponse = BaseResponse<GetAnalystUserData[]>;

export type User = {
  _id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  venue: Venue;
  role: RoleEnum;
};

export type SignInPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export type UpdateUserPayload = {
  id: number;
  data: UpdateUserData;
};

export type UpdateUserData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
};

export type GetAnalystUserQuery = {
  year: number;
  role?: RoleEnum;
};

export type GetAnalystUserData = {
  month: string;
  total: number;
};

export type GetAllUsersQuery = {
  role?: RoleEnum;
} & BaseQuery;
