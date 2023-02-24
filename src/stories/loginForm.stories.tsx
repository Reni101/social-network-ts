import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LoginForm } from '../components/Login/LoginForm'

import { ReduxStoreProviderDecorator } from './decorators/ReduxStoreProviderDecorator'

export default {
	title: 'Example/LoginForm',
	component: LoginForm,
	argTypes: {},
	decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = args => <LoginForm />

export const Login = Template.bind({})

Login.args = {
	label: 'LoginForm'
}
