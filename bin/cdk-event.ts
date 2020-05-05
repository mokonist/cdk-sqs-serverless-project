#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkEventStack } from '../lib/cdk-event-stack';

const app = new cdk.App();
new CdkEventStack(app, 'CdkEventStack');
