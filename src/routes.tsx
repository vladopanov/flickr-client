import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './features/layout/Layout';
import { PhotosView } from './features/photos/PhotosView';
import { EmailView } from './features/email/EmailView';

export const routes = <Layout>
    <Route exact path='/' component={PhotosView} />
    <Route path='/email' component={EmailView} />
</Layout>;
