'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

const RepoForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { repoUrl: '' },
    validationSchema: Yup.object({
      repoUrl: Yup.string()
        .matches(/^https:\/\/github.com\/[^/]+\/[^/]+$/, 'Format must be https://github.com/user/repo')
        .required('GitHub Repo URL is required'),
    }),
    onSubmit: (values: { repoUrl: string }) => {
      const urlParts = values.repoUrl.split('https://github.com/')[1];
      router.push(`/repo?url=${encodeURIComponent(urlParts)}`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-4">
      <input
        type="text"
        name="repoUrl"
        value={formik.values.repoUrl}
        onChange={formik.handleChange}
        placeholder="Enter GitHub repo URL (https://github.com/user/repo)"
        className="border p-2 w-full"
      />
      {formik.errors.repoUrl && <div className="text-red-500">{formik.errors.repoUrl}</div>}
      <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
        Fetch Files
      </button>
    </form>
  );
};

export default RepoForm;
