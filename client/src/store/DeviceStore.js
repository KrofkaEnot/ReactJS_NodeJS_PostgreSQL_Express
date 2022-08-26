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
import images from '../assets/images.jpg';

export default class DeviceStore {
    constructor() {
        this._types = [
            { id: 1, name: 'Холодильники' },
            { id: 2, name: 'Смартфоны' },
            { id: 3, name: 'Книги' },
            { id: 4, name: 'Светильники' },
        ]
        this._brands = [
            { id: 1, name: 'Samsung' },
            { id: 2, name: 'Apple' },
            { id: 3, name: 'SangYong' },
            { id: 4, name: 'Alcatel' },
            { id: 5, name: 'Voxtail' },
            { id: 6, name: 'Nokia' },
            { id: 7, name: 'Sony' },
            { id: 8, name: 'Xiaomi' },
            { id: 9, name: 'BlackBarry' },
            { id: 10, name: 'FreeCall' },
            { id: 11, name: 'MGTS' },
            { id: 12, name: 'BBK' },
        ]

        /**
         * img: 'https://' - может быть ссылкой на картинку 
         * img: images - может быть импортированный объект 
         */
        this._devices = [
            { id: 1, name: 'iphone 12pro', price: 120000, rating: 4, img: 'https://img2.akspic.ru/previews/9/0/9/8/6/168909/168909-ballonchik-graffiti-ulichnoe_iskusstvo-svet-purpur-x750.jpg' },
            { id: 2, name: 'iphone 11pro', price: 100000, rating: 5, img: images },
            { id: 3, name: 'iphone 10pro', price: 80000, rating: 3, img: images },
            { id: 4, name: 'iphone 9pro', price: 70000, rating: 2, img: images },
            { id: 5, name: 'Alcatel', price: 120000, rating: 2, img: images },
            { id: 6, name: 'BBK', price: 1000, rating: 3, img: images },
            { id: 7, name: 'Sony', price: 8000, rating: 5, img: images },
            { id: 8, name: 'Siemens', price: 7000, rating: 2, img: 'https://' },
        ]

        /**
         * Поле для хранения выделенных объектов
         */
        this._selectedType = {}
        this._selectedBrand = {}

        makeAutoObservable(this) /**Отслеживает изменения в контексте */
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
    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    /**
     * Поле для выделенных объектов
     * Хранит/Устанавливает выделенный объект
     */
    setSelectedType(type) {
        return this._selectedType = type
    }
    setSelectedBrand(brand) {
        return this._selectedBrand = brand
    }


    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get devices() {
        return this._devices
    }

    /**
     * Для получения визуально-выбранного элемента в Shop.js
     * Отдаёт выделенный элемент 
     */
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
}