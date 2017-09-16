import Text from './text'

const Link = Text.withComponent('a').extend`
  font: inherit;

  :visited {
    color: white;
  }

  :hover {
    color: #ccc;
  }
`
Link.displayName = 'Link'
export default Link

const Ul= Text.withComponent('ul').extend`
  padding: 0;

  li {
    list-style: none;
  }
`

export const LinkMenu = ({ children, ...rest }) => (
  <Ul {...rest}>
    {children.map(child => <li>{child}</li>)}
  </Ul>
)
