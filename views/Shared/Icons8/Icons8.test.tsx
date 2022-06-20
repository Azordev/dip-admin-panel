import { render } from '@testing-library/react'

import Icons8 from '.'

describe('Icons8', () => {
  it('renders component with not null name parameter', () => {
    const { container } = render(<Icons8 name="search" />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null style parameter', () => {
    const { container } = render(<Icons8 name="search" iconStyle="ios" />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null color parameter', () => {
    const { container } = render(<Icons8 name="search" color="#ff0000" />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null size parameter', () => {
    const { container } = render(<Icons8 name="search" size={32} />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null className parameter', () => {
    const { container } = render(<Icons8 name="search" className="test" />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null iconStyle parameter', () => {
    const { container } = render(<Icons8 name="search" iconStyle="ios" />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null color and iconStyle parameter', () => {
    const { container } = render(<Icons8 name="search" color="#ff0000" iconStyle="ios" />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null color and size parameter', () => {
    const { container } = render(<Icons8 name="search" color="#ff0000" size={32} />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null color, size and iconStyle parameter', () => {
    const { container } = render(<Icons8 name="search" color="#ff0000" size={32} iconStyle="ios" />)
    expect(container).toMatchSnapshot()
  })

  it('renders component with not null className, color, size and iconStyle parameter', () => {
    const { container } = render(<Icons8 name="search" className="test" color="#ff0000" size={32} iconStyle="ios" />)
    expect(container).toMatchSnapshot()
  })
})
