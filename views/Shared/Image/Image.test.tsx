import { render } from '@testing-library/react'

import Image from '.'

describe('Image', () => {
  it('should render', () => {
    const { asFragment } = render(<Image src="http://test.com/test.png" alt="test" className="" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with className', () => {
    const { asFragment } = render(<Image src="http://test.com/test.png" alt="test" className="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with src', () => {
    const { asFragment } = render(<Image src="http://test.com/test.png" alt="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with alt', () => {
    const { asFragment } = render(<Image src="http://test.com/test.png" alt="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with src and alt', () => {
    const { asFragment } = render(<Image src="http://test.com/test.png" alt="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with src and alt and className', () => {
    const { asFragment } = render(<Image src="http://test.com/test.png" alt="test" className="test" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with src and alt and className and other props', () => {
    const { asFragment } = render(<Image src="http://test.com/test.png" alt="test" className="test" layout="fill" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
