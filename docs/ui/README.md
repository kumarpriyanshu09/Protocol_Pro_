# UI Documentation

This section contains documentation for the UI components used in the Protocol Pro application.

## UI Package

The UI package (`@repo/ui`) provides reusable UI components styled with the ShadCN approach. These components are used throughout the Protocol Pro application to maintain a consistent look and feel.

## Components

- **Button**: A customizable button component
- **Card**: A container component with styling
- **Input**: A text input component
- **Text**: A text component with styling options
- **ProgressBar**: A progress bar component

## Styling

The UI components follow the ShadCN styling approach, which provides:

- Consistent theming and styling
- Easy customization
- Responsive design
- Accessibility features

## Usage

Import components from the UI package:

```tsx
import { Button, Card, Input, Text, ProgressBar } from '@repo/ui';

function MyComponent() {
  return (
    <Card>
      <Text>Hello, world!</Text>
      <Input placeholder="Enter your name" />
      <ProgressBar value={50} />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Component Documentation

- [Button](./components/button.md)
- [Card](./components/card.md)
- [Input](./components/input.md)
- [Text](./components/text.md)
- [ProgressBar](./components/progress-bar.md)

## Screen Documentation

- [Login Screen](./screens/login.md)
- [Dashboard Screen](./screens/dashboard.md)
- [Protocol Details Screen](./screens/protocol-details.md)
