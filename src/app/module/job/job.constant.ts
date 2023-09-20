export const jobPostFilterableField = [
  'searchTerm',
  'title',
  'workEnvironment',
  'experienceLevel',
  'jobType',
  'minSalary',
  'maxSalary',
  'categoryId',
];

export const jobPostSearchableField = ['title', 'description', 'requirements'];

export const jobPostRelationalFields: string[] = ['categoryId'];
export const jobPostRelationalFieldsMapper: {
  [key: string]: string;
} = {
  categoryId: 'category',
};
