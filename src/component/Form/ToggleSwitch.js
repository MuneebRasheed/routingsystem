import React, { useState } from "react"
import { Switch } from "react-native"

const ToggleSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <Switch
      trackColor={{ false: "grey", true: "rgba(89, 73, 158, 1)" }}
      thumbColor={isEnabled ? "blue" : "white"}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  )
}

export default ToggleSwitch