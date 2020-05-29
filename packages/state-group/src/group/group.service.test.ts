import { createNewGroup } from './group.service'
import { FetchMock } from 'jest-fetch-mock'

const fetchMock = fetch as FetchMock

describe('Group service', () => {
  beforeEach(() => {
    fetchMock.mockClear()
  })

  it('Should create a new group', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        name: 'tester',
        slug: 'tester',
        id: 'fake-id',
      })
    )

    await createNewGroup({
      name: 'tester',
      description: 'lorem ipsum',
    })

    expect(fetchMock).toBeCalledTimes(1)
  })
})
