
# TradeLedger Test Component
This component looks up australian businesses by ABN, ACN or Company name, and presents a list of them which can then be browsed through.

## To Run
npm/yarn start will fire up the development server, while npm/yarn test will launch tests. This was built using the create-react-app boilerplate and so all commands are identical.

## Libraries used

Axios

React

## Components

### Form
A generic form component which renders inputs based upon types and stores it in an internal state managed via keys in each object. Originally the logic for handling this was managed by the LookUpContainer component, but I realised that it becomes much more reusable if it's self-contained and the only props required are an onSubmit function and a model prop, as opposed to the parent state, and the onChange functions.

### LookUpContainer
Parent container for the whole component, handles the majority of the logic (get calls, handling search types etc). I tried to avoid having to write an onACNLookup, onNameLookup etc using this.state.type and key references so that one function could handle and return all the parameters needed for the get call.

### BusinessDetails
Stateless presentational component for rendering selectedBusiness from the BusinessDetails component, used Object.keys to display everything as the different objects that were returned from ABN/ACN calls made it difficult to pinpoint what data was actually relevant.

### BusinessList
Renders the list of companies passed by LookUpContainer after the get call. Sets the selectedBusiness state on click which then renders BusinessDetails. 


## Considerations/Thoughts
Ideally, I would have moved the BusinessList logic up to LookUpContainer and made it stateless, but it did feel a little more comfortable being able to set the selectedBusiness state without having to pass down more props although that approach makes more structural sense

I tried to keep all variable names accurate for the sake of consistency. I could have potentially enforced this by using stricter parameter namings (i.e. instead of func(var1, var2) I could have used func({var1, var2})) but it seemed to be excessive in an environment maintained by a single developer.

The SCSS is a little over-componentalised for a demo but for the sake of demonstrating my approach to SCSS, my file structure is always feature/_component.scss with an index file tying it all together (unless using a package that allows for wildcard imports which node-sass didn't seem to). The index file can then be imported by App.scss and makes it a little easier to load/unload entire components if they're no longer needed.

I chose to keep all my padding/colors in an object because it gave me a single source of truth. If I needed to change the primary color or input padding I could do this universally without having to update each element. I could have achieved this with standalone variables but I feel like tying it to a function made it syntactically a little easier to understand (ex. element x uses the lightest primary color so i can just use color(primary, light) as opposed to having 3 variables for colorPrimaryLight, colorPrimaryDark etc).

Having an API key in the app was a big security risk and ideally this would have been tied to a .env file on a server-rendered app or stored within graphQL but since I didn't implement either of these I took the risk for the sake of the demo.

Used some object destructuring where this.props/state were called a lot for the sake of cleaner code, but I'm unsure of how severe the performance detriment caused by having a destructured object is, and where it would be most necessary.

I have put a basic test in place, but have not gone too in-depth as I don't have extensive knowledge of jest and so modified the test that comes prepackaged with CRA, but would be eager to learn more.

The businessDetails are handled a bit poorly. I could have kept ABN/ACN values as an object instead of wrapping them in an array but this was done before I realised that the object structure is different for these types of get calls and so the keys are different from a name call.