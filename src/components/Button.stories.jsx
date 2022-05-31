import Button from './Button'

export default {
  title: 'Button',
  component: Button,
}

export const Primary = props => (
  <Button {...props} color="blue" label="a button" />
)
