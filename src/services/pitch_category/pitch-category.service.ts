import mediaService from '../media/media.service';
import {
  CreatePitchCategoryPayload,
  PitchCategoriesResponse,
  PitchCategoryResponse,
  UpdatePitchCategoryPayload,
} from './pitch-category.dto';
import { BaseQuery } from '@/common/dtos/base.dto';
import axiosInstance from '@/utils/axiosConfig';

const pitchCategoryService = {
  getAll: async (query: BaseQuery) => {
    const { data } = await axiosInstance.get<PitchCategoriesResponse>('/pitch-categories', {
      params: {
        ...query,
      },
    });

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<PitchCategoryResponse>(`/pitch-categories/${id}`);

    return data.data;
  },
  create: async (payload: CreatePitchCategoryPayload) => {
    const { thumbnail, ...rest } = payload;

    const uploadData = await mediaService.uploadImages(thumbnail);

    const { data } = await axiosInstance.post<PitchCategoryResponse>('pitch-categories', {
      thumbnail: uploadData[0].url,
      ...rest,
    });

    return data;
  },
  update: async ({ id, data: updateData }: UpdatePitchCategoryPayload) => {
    const { thumbnail, ...rest } = updateData;

    if (thumbnail?.length) {
      const uploadData = await mediaService.uploadImages(thumbnail);

      const { data } = await axiosInstance.put<PitchCategoryResponse>(`pitch-categories/${id}`, {
        thumbnail: uploadData[0].url,
        ...rest,
      });

      return data;
    }

    const { data } = await axiosInstance.put<PitchCategoryResponse>(`pitch-categories/${id}`, rest);

    return data;
  },
  delete: async (id: number) => {
    await axiosInstance.delete(`pitch-categories/${id}`);
  },
};

export default pitchCategoryService;
