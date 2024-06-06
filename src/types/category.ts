
export interface CategoryListRequest {
  perPage: number,
  page: number,
}
export interface CategoryCreateRequest {
title: string,
description: string,
icon: string,
banner: string,
}
export interface CategoryUpdateRequest {
  id:string,
  title: string,
  description: string,
  icon: string,
  banner: string,
}
