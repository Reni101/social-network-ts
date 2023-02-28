import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Paginator } from '../common/Paginator/Paginator'

import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator'

export default {
	title: 'Example/Paginator',
	component: Paginator,
	argTypes: {},
	decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Paginator>

const Template: ComponentStory<typeof Paginator> = args => <Paginator {...args} />

export const Paginators = Template.bind({})

Paginators.args = {
	pageSize: 10,
	currentPage: 1,
	currentPageSize: 5,
	totalItemsCount: 200,
	onPageChanged: action('page / page size')
}
