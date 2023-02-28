import React, { ComponentProps, FC } from 'react'
import styles from './Container.module.css'

type ContainerProps = ComponentProps<'div'>

export const Container: FC<ContainerProps> = ({ className, ...rest }) => {
	return <div className={`${styles.container} ${className}`} {...rest} />
}
