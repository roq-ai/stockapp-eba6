import * as yup from 'yup';

export const commentValidationSchema = yup.object().shape({
  comment: yup.string().required(),
  user_id: yup.string().nullable().required(),
  stock_idea_id: yup.string().nullable().required(),
});
