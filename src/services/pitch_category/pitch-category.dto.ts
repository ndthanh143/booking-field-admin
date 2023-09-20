import { BaseData, BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';

export type PitchCategoriesResponse = BasePaginationResponse<PitchCategory>;
export type PitchCategoryResponse = BaseResponse<PitchCategory>;

export type PitchCategory = {
  name: string;
  thumbnail: string;
  description: string;
} & BaseData;

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
