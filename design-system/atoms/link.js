import Text from './text'

const Link = Text.withComponent('a').extend`
  font: inherit;
  color: inherit;

  :visited {
    color: inherit;
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
    {children.map((child, index) => <li key={index}>{child}</li>)}
  </Ul>
)
