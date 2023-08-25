import { BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';

export type PitchCategoriesResponse = BasePaginationResponse<PitchCategory>;
export type PitchCategoryResponse = BaseResponse<PitchCategory>;

export type PitchCategory = {
  _id: number;
  name: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePitchCategoryPayload = {
  name: string;
  description: string;
  thumbnail: FileList;
};

export type UpdatePitchCategoryPayload = {
  id: number;
  data: UpdatePitchCategoryData;
};

export type UpdatePitchCategoryData = Partial<CreatePitchCategoryPayload>;
