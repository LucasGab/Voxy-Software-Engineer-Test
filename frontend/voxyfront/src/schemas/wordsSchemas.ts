import * as yup from 'yup';

export const wordsSchema = yup.object().shape({
  text: yup
    .string()
    .required('Text is mandatory'),
  type: yup.mixed<'FRONT'|'BACK'>().required('Request Type is required').oneOf(['FRONT','BACK'], 'Request Type is not valid'),
});