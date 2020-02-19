import React, { PureComponent, createContext } from 'react'
import { getItem, setItem } from '@gtms/commons/helpers/localStorage'

const RULES_ACCEPTED = 'rulesAccepted'

interface IRulesProvidersState {
  areRulesAccepted: boolean
  callBackFunc?: () => void
}

export interface IRulesContext extends IRulesProvidersState {
  acceptRules: () => void
  declineRules: () => void
  setCallbackFunc: (func: () => void) => void
}

export const RulesContext = createContext<IRulesContext>({
  areRulesAccepted: false,
  acceptRules: () => undefined,
  declineRules: () => undefined,
  setCallbackFunc: () => undefined,
})

export class RulesProviders extends PureComponent<{}, IRulesProvidersState> {
  constructor(props: {}) {
    super(props)

    this.state = {
      areRulesAccepted: getItem(RULES_ACCEPTED) === 'true' ? true : false,
      callBackFunc: undefined,
    }
  }

  acceptRules = () => {
    this.setState({
      areRulesAccepted: true,
    })

    setItem(RULES_ACCEPTED, 'true')
  }

  declineRules = () =>
    this.setState({
      areRulesAccepted: false,
    })

  setCallbackFunc = (func: () => void): void =>
    this.setState({
      callBackFunc: func,
    })

  render() {
    const { children } = this.props

    return (
      <RulesContext.Provider
        value={{
          ...this.state,
          acceptRules: this.acceptRules,
          declineRules: this.declineRules,
          setCallbackFunc: this.setCallbackFunc,
        }}
      >
        {children}
      </RulesContext.Provider>
    )
  }
}

export default RulesProviders
