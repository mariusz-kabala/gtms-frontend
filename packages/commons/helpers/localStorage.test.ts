import { getItem, setItem } from './localStorage'

const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
}

Object.defineProperty(window, 'localStorage', { value: localStorage })

describe('Local storage helper', () => {
  it('Should return proper value from LS', () => {
    localStorage.getItem.mockImplementation(() => 'testing')

    expect(getItem('key')).toEqual('testing')
    expect(localStorage.getItem).toBeCalledTimes(1)
  })

  it('Should set value in LS', () => {
    setItem('name', 'fake-value')

    expect(localStorage.setItem).toBeCalledWith('name', 'fake-value')
    expect(localStorage.setItem).toBeCalledTimes(1)
  })
})
