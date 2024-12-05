import { CommonActions, createNavigationContainerRef, StackActions } from "@react-navigation/native";

export const naviagtionRef = createNavigationContainerRef()
export async function navigate(routeName: string, params?: object) {
    naviagtionRef.isReady()
    if (naviagtionRef.isReady()) {
        naviagtionRef.dispatch(CommonActions.navigate(routeName, params))
    }
}

export async function replace(routeName: string, params?: object) {
    naviagtionRef.isReady()
    if (naviagtionRef.isReady()) {
        naviagtionRef.dispatch(StackActions.replace(routeName, params))
    }
}
export async function resetAndNavigate(routeName: string) {
    naviagtionRef.isReady()
    if (naviagtionRef.isReady()) {
        naviagtionRef.dispatch(CommonActions.reset(
            {
                index: 0,
                routes: [{ name: routeName }]

            }
        ))
    }
}

export async function goBack() {
    naviagtionRef.isReady()
    if (naviagtionRef.isReady()) {
        naviagtionRef.dispatch(CommonActions.goBack())
    }
}

export async function push(routeName: string, params?: object) {
    naviagtionRef.isReady()
    if (naviagtionRef.isReady()) {
        naviagtionRef.dispatch(StackActions.push(routeName, params))
    }
}

export async function prepareNavigation() {
    naviagtionRef.isReady()

}
