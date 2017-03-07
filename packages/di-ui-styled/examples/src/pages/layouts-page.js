import React from 'react'
import Title from '../components/title'
import { Caret, PageHeader, Container, Margin } from '../../../src'

import Playground from '../components/themed-playground'
import DocPage from '../components/doc-page'

const PageHeaderPage = () => (
  <DocPage>
    <Title>PageHeader</Title>
    <p>Default:</p>
    <Playground
      defaultValue={`<Container><Margin secondary><PageHeader title="Hello World" /></Margin></Container>`}
      scope={{ PageHeader, Container, Margin }}
      top left fullWidth
    />
    <p>Add content in line with header on right side of page:</p>
    <Playground
      defaultValue={
`<PageHeader title="Hello World">
  Right Content
</PageHeader>`
      }
      scope={{ PageHeader }}
      top left fullWidth
    />
    <p>
      Stretch line edge to edge by compensating for outer padding. Only do
      this if container and heading have a common source of truth for this value:
    </p>
    <Playground
      defaultValue={
`<PageHeader
  title="Hello World"
  padding={12}
  margin={-12}
>
  Right Content
</PageHeader>`
      }
      scope={{ PageHeader }}
      top left fullWidth
    />
  </DocPage>
)

export default PageHeaderPage