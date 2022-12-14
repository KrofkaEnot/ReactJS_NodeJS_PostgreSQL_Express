/**
    Создание наблюдаемого состояния
    Свойства, целые объекты, массивы, карты и наборы можно сделать наблюдаемыми. 
    Основы создания наблюдаемых объектов — это указание аннотации для каждого свойства 
    с использованием makeObservable. Наиболее важные аннотации:

    observable - определяет отслеживаемое поле, в котором хранится состояние.
    action - помечает метод как действие, которое изменит состояние.
    computed - отмечает геттер, который будет извлекать новые факты из состояния и кэшировать его вывод.
    Коллекции, такие как массивы, карты и наборы, автоматически становятся доступными для наблюдения.

    Применение:
    makeObservable(target, annotations?, options?)

    makeAutoObservableэто как makeObservableна стероидах, так как он выводит все свойства по умолчанию. 
    Вы по-прежнему можете использовать overridesдля переопределения поведения по умолчанию определенные аннотации. 
    В частности false, может использоваться для полного исключения свойства или метода из обработки. 
    Взгляните на вкладки кода выше для примера. Функция makeAutoObservableможет быть более компактной и простой 
    в обслуживании, чем использование makeObservable, поскольку новые члены не должны упоминаться явно. 
    Однако makeAutoObservableего нельзя использовать в классах, которые имеют super или являются подклассами .

 */
import { makeAutoObservable } from 'mobx';

export default class UserStore {
    constructor() {
        /**
         * Статус авторизации пользователя
         */
        this._isAuth = false
        this._user = {}
        /**
         * Отслеживает изменения в контексте 
         */
        makeAutoObservable(this)
    }
    /**
     * Правила вывода:
        Все собственные свойства становятся observable.
        Все getтеры становятся computed.
        Все setтеры становятся action.
        Все функции на прототипе делаются autoAction.
        Все функции генератора на прототипе становятся flow. 
        (Обратите внимание, что функции генератора не обнаруживаются в некоторых конфигурациях транспиляторов, 
        если поток не работает должным образом, обязательно укажите это flowявно.)
        Члены, отмеченные falseв overridesаргументе, не будут аннотированы. 
        Например, используя его для полей только для чтения, таких как идентификаторы.
     */
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}

