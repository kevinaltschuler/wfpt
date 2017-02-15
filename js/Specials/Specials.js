import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import data from './ContentBlock';

// Header

// Text for rules for private show
// Form
// Picture/sponsor spoace

// Footer

export default () => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: data }} />
    <Form>
      <FormGroup>
        <Input type="text" name="name" id="name" placeholder="Full Name" />
      </FormGroup>
      <FormGroup>
        <Input type="email" name="email" id="email" placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Input type="number" name="phone" id="phone" placeholder="Phone Number" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="city" id="city" placeholder="City" />
      </FormGroup>
      <FormGroup>
        <Input type="text" name="state" id="state" placeholder="State" />
      </FormGroup>
      <FormGroup tag="fieldset">
        <Input type="text" name="org" id="org" placeholder="Organization" />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="checkbox" />{' '}
          I am not a robot.
        </Label>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  </div>
);
