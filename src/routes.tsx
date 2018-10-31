import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './features/layout/Layout';
import { PhotosView } from './features/photos/PhotosView';
import { ContactView } from './features/contact/ContactView';

export const routes = <Layout>
    <Route exact path='/' component={PhotosView} />
    <Route path='/contact' component={ContactView} />
</Layout>;
