import {
    Button,
    Text,
    ButtonGroup,
    FormControl,
    FormLabel,
    Input,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Stack,
    useDisclosure,
    Icon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
export function ChangeSettingsPopover({
    whichSetting,
    description,
    onUpadate,
}) {
    const firstFieldRef = useRef(null);
    const { onOpen, onClose, isOpen } = useDisclosure();
    const noAnim = {}
    const [setting, setSetting] = useState();
    useEffect(() => {
        if (setting < 1) {
            setSetting(1)
        } else if (setting > 1000) {
            setSetting(1000)
        }
    }, [setting]);
    return (
        <>
            <Popover
                isOpen={isOpen}
                initialFocusRef={firstFieldRef}
                onOpen={onOpen}
                onClose={onClose}
                placement="top"
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <Icon
                        as={EditIcon}
                        _hover={{
                            transform: "scale(1.1)"
                        }}
                        transition={"transform 0.2s ease-in-out"}

                        mb={1}
                        cursor={"pointer"}
                    />                </PopoverTrigger>
                <PopoverContent p="5" variants={noAnim}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <Stack spacing={4}>
                        <Text>Update {description}</Text>
                        <FormControl>
                            <NumberInput min={1} max={1000}>
                                <NumberInputField value={setting} onChange={(e) => { setSetting(e.target.value) }} />
                            </NumberInput>
                        </FormControl>

                        <ButtonGroup display="flex" justifyContent="flex-end">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="teal" onClick={() => { onUpadate(whichSetting, parseInt(setting)) }}>
                                Update Now
                            </Button>
                        </ButtonGroup>
                    </Stack>
                </PopoverContent>
            </Popover>
        </>
    );
}

