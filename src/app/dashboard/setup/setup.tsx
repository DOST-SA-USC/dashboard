'use server';
import React from 'react';

import Form from './form';
import { UserType } from '@/type';

const Setup = (props: { userID: string; user: UserType }) => {
  return <Form userID={props.userID} user={props.user} />;
};

export default Setup;
