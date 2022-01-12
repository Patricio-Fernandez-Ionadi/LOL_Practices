import styles from './styles.module.css'

const Loading = () => {
	return (
		<div className={styles.loaderContainer}>
			<div className={styles.loading}>
				<img style={{ maxWidth: '100%' }} src={`./assets/icon.png`} alt='' />
			</div>
		</div>
	)
}

export default Loading
