import * as yup from 'yup';

export const stockIdeaValidationSchema = yup.object().shape({
  idea: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
