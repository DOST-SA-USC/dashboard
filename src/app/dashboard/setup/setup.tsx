'use server';
import React from 'react';

import { UserType } from '@/type';

import Form from './form';

const Setup = (props: { userID: string; user: UserType }) => {
  return <Form userID={props.userID} user={props.user} />;
};

export default Setup;
