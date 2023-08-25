import pitchCategoryService from './pitch-category.service';
import { BaseQuery } from '@/common/dtos/base.dto';
import { defineQuery } from '@/utils/defineQuery';

export const pitchCategoryKeys = {
  all: ['pitchCategory'] as const,
  lists: () => [...pitchCategoryKeys.all, 'list'] as const,
  list: (query: BaseQuery) =>
    defineQuery([...pitchCategoryKeys.lists(), query], () => pitchCategoryService.getAll(query)),
  details: () => [...pitchCategoryKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...pitchCategoryKeys.details(), id], () => pitchCategoryService.getOne(id)),
};
