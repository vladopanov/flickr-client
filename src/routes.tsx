import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './features/layout/Layout';
import { ContactView } from './features/contact/ContactView';
import { FeedView } from './features/feeds/FeedView';

export const routes = <Layout>
    <Route exact path='/' component={FeedView} />
    <Route path='/contact' component={ContactView} />
</Layout>;
