import { decodeParam, getParamsFromObject } from './helpers'

describe('useFacebookLogin hook helpers', () => {
  it('Should decode param from given string', () => {
    expect(
      decodeParam(
        '?code=AQDLKE7dRFIJ87jEPfNI273RIHZEWD5ZmT4JCY-c2V4VwyOh5QARj_A2EdGx4Q2o8Ma73GNftGE6aD9uLmaweZlLNqk8TZksplLdafk8SpQtaQRrbNtxkG9HjrnDyaFxdDxxGRLL9-cqgbeNIzg6pdfzqhuwgITQ1LcMZUqpdtpMQuPedXZ3Mv19NcT6HMyC7t2dElnWRUz8X_4Snh4_-arwVp-Hvk7kF-_ajgYyZFX3-AOz3k0HuXEVkZIpXQm-hpQ3_qYLQlYVhvO3vME5wppmJpuhtGURR6nWo2QeZaRwTpgdVr_JS7AEZWyDF-xZyds&state=facebookdirect',
        'code'
      )
    ).toBe(
      'AQDLKE7dRFIJ87jEPfNI273RIHZEWD5ZmT4JCY-c2V4VwyOh5QARj_A2EdGx4Q2o8Ma73GNftGE6aD9uLmaweZlLNqk8TZksplLdafk8SpQtaQRrbNtxkG9HjrnDyaFxdDxxGRLL9-cqgbeNIzg6pdfzqhuwgITQ1LcMZUqpdtpMQuPedXZ3Mv19NcT6HMyC7t2dElnWRUz8X_4Snh4_-arwVp-Hvk7kF-_ajgYyZFX3-AOz3k0HuXEVkZIpXQm-hpQ3_qYLQlYVhvO3vME5wppmJpuhtGURR6nWo2QeZaRwTpgdVr_JS7AEZWyDF-xZyds'
    )
  })

  it('It should create params from an object', () => {
    expect(
      getParamsFromObject({
        foo: 'bar',
        Lorem: 'ipsum',
        test: 10,
      })
    ).toBe('?foo=bar&Lorem=ipsum&test=10')
  })
})
