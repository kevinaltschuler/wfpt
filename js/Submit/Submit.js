import React from 'react';
import data from './data';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default() => (
  <div>
    <h1>Submit</h1>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input name="name" id="name" placeholder="Jerry Schmitenstein" />
    </FormGroup>
    <FormGroup>
      <Label for="email">Email</Label>
      <Input type="email" name="email" id="email" placeholder="jerry.s@email.com" />
    </FormGroup>
    <FormGroup>
      <Label for="phone">Phone</Label>
      <Input name="phone" id="phone" placeholder="555-555-5555" />
    </FormGroup>
    <FormGroup>
      <Label for="website">Website</Label>
      <Input name="website" id="website" placeholder="www.website.com" />
    </FormGroup>
    <FormGroup>
      <Label for="link">Submission Link</Label>
      <Input name="link" id="link" placeholder="website.com/file" />
    </FormGroup>
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        {
          data.map(item =>
            <div
              style={{
                flex: 1,
                minWidth: '400px',
                maxWidth: '400px',
                margin: '0 25px',
              }}
              dangerouslySetInnerHTML={{ __html: item }}
            />
          )
        }
      </div>
    </div>
  </div>
);
