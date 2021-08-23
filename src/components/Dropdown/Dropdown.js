import { Dropdown as BootstrapDropdown, DropdownButton } from 'react-bootstrap';

function Dropdown({
    id,
    selectText,
    selectedItem,
    values,
    onSelect,
    ...rest
}) {
    return (
        <DropdownButton id={id} title={selectedItem ?? selectText} onSelect={onSelect} align={{ sm: 'end' }} {...rest}>
            <BootstrapDropdown.ItemText>{selectText}</BootstrapDropdown.ItemText>
            {values.map((ele, idx) =>
                <BootstrapDropdown.Item href='#' eventKey={ele} key={id + 'listItem' + idx}>{ele}</BootstrapDropdown.Item>
            )}
        </DropdownButton>
    )
}

export default Dropdown