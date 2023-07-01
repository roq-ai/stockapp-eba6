import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createStockIdea } from 'apiSdk/stock-ideas';
import { Error } from 'components/error';
import { stockIdeaValidationSchema } from 'validationSchema/stock-ideas';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { StockIdeaInterface } from 'interfaces/stock-idea';

function StockIdeaCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StockIdeaInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStockIdea(values);
      resetForm();
      router.push('/stock-ideas');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StockIdeaInterface>({
    initialValues: {
      idea: '',
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: stockIdeaValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Stock Idea
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="idea" mb="4" isInvalid={!!formik.errors?.idea}>
            <FormLabel>Idea</FormLabel>
            <Input type="text" name="idea" value={formik.values?.idea} onChange={formik.handleChange} />
            {formik.errors.idea && <FormErrorMessage>{formik.errors?.idea}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'stock_idea',
    operation: AccessOperationEnum.CREATE,
  }),
)(StockIdeaCreatePage);
