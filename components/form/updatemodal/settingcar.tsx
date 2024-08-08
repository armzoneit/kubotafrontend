/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Center, IconButton, Box, HStack, Text, Image } from "@chakra-ui/react"
import { AddIcon, CloseIcon } from "@chakra-ui/icons"
import isEqual from "lodash/isEqual"
import { Controlled as ControlledZoom } from "react-medium-image-zoom"

import "react-medium-image-zoom/dist/styles.css"

const ModalSetCar = ({
    types,
    onClose,
    onOpen,
    
}:any) => {

}