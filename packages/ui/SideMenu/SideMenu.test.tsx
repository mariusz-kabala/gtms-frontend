import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SideMenu } from './index'
import { MenuItem } from './MenuItem'

const GROUP_MENU_LOGO_PATH = '/images/temp_images/side_bar_logo.png'
const SIDE_MENU_TEST_ID = 'side-menu'
const SIDE_MENU_LOGO_TEST_ID = `${SIDE_MENU_TEST_ID}-logo`
const HEADER_TEXT = 'SzukamAndrzeja.pl'

const COLAPSED_ITEM_TEXT_1 = 'Item1'
const EXPANDED_ITEM_TEXT_1 = 'Text1'
const COLAPSED_ITEM_TEXT_2 = 'Item2'
const EXPANDED_ITEM_TEXT_2 = 'Text2'

const MenuHeader = () => {
  return (
    <>
      <b>{HEADER_TEXT}</b>
    </>
  )
}

describe('<SideMenu />', () => {
  it('Should display menu items and header', () => {
    const { getByTestId, getByText } = render(
      <SideMenu
        menuLogoPath={GROUP_MENU_LOGO_PATH}
        menuHeader={<MenuHeader />}
        testId={SIDE_MENU_TEST_ID}
      >
        <MenuItem
          collapsedContent={<div>{COLAPSED_ITEM_TEXT_1}</div>}
          expandedContent={<div>{EXPANDED_ITEM_TEXT_1}</div>}
        />
        <MenuItem
          collapsedContent={<div>{COLAPSED_ITEM_TEXT_2}</div>}
          expandedContent={<div>{EXPANDED_ITEM_TEXT_2}</div>}
        />
      </SideMenu>
    )

    expect(getByTestId(SIDE_MENU_TEST_ID)).toBeInTheDocument()

    expect(getByText(HEADER_TEXT)).toBeInTheDocument()

    expect(getByText(COLAPSED_ITEM_TEXT_1)).toBeInTheDocument()
    expect(getByText(EXPANDED_ITEM_TEXT_1)).toBeInTheDocument()

    expect(getByText(COLAPSED_ITEM_TEXT_2)).toBeInTheDocument()
    expect(getByText(EXPANDED_ITEM_TEXT_2)).toBeInTheDocument()
  })

  it('Should toggle expand on logo click', async () => {
    const { getByTestId, container } = render(
      <SideMenu
        menuLogoPath={GROUP_MENU_LOGO_PATH}
        menuHeader={<MenuHeader />}
        testId={SIDE_MENU_TEST_ID}
      >
        <MenuItem
          collapsedContent={<div>{COLAPSED_ITEM_TEXT_1}</div>}
          expandedContent={<div>{EXPANDED_ITEM_TEXT_1}</div>}
        />
      </SideMenu>
    )

    const menuLogo = getByTestId(SIDE_MENU_LOGO_TEST_ID)

    fireEvent.click(menuLogo)
    expect(container.querySelector('.expanded')).toBeInTheDocument()

    fireEvent.click(menuLogo)
    expect(container.querySelector('.expanded')).not.toBeInTheDocument()
  })

  it('Should open menu by passed prop', async () => {
    const { container } = render(
      <SideMenu
        isExpanded={true}
        menuLogoPath={GROUP_MENU_LOGO_PATH}
        menuHeader={<MenuHeader />}
      >
        <MenuItem
          collapsedContent={<div>{COLAPSED_ITEM_TEXT_1}</div>}
          expandedContent={<div>{EXPANDED_ITEM_TEXT_1}</div>}
        />
      </SideMenu>
    )

    expect(container.querySelector('.expanded')).toBeInTheDocument()
  })

  it('Should call function on expand', async () => {
    const onToggle = jest.fn()

    const { getByTestId } = render(
      <SideMenu
        menuLogoPath={GROUP_MENU_LOGO_PATH}
        menuHeader={<MenuHeader />}
        onToggleExpand={onToggle}
      >
        <MenuItem
          collapsedContent={<div>{COLAPSED_ITEM_TEXT_1}</div>}
          expandedContent={<div>{EXPANDED_ITEM_TEXT_1}</div>}
        />
      </SideMenu>
    )

    const menuLogo = getByTestId(SIDE_MENU_LOGO_TEST_ID)
    fireEvent.click(menuLogo)
    fireEvent.click(menuLogo)

    expect(onToggle).toHaveBeenCalledTimes(2)
  })
})
