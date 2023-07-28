import moment from "moment";
import * as locale from 'locale-codes';
import validator from 'validator';
import {phone} from 'phone';
import countryLookup from 'country-code-lookup';
import * as prismaTypes from '@prisma/client';
import sanitizeHtml from 'sanitize-html';


export class ValidationError extends Error {
    isValidationError = true;
    constructor(message: string) {
        super(message);
    }
}        



export enum ModelValidatorEnum {
    GenericTypes =  'GenericTypes',
    Snapshot =  'Snapshot',
    ContentManagement =  'ContentManagement',
    TranslationKey =  'TranslationKey',
    TranslationText =  'TranslationText',
    User =  'User',
    Role =  'Role',
    UserRole =  'UserRole',
    UserTableDefinition =  'UserTableDefinition',
    UserTableView =  'UserTableView',
    GroupTableView =  'GroupTableView',
    RolePermission =  'RolePermission',
    Invite =  'Invite',
    Group =  'Group',
    Permission =  'Permission',
    Application =  'Application',
    File =  'File',
    TableDefinition =  'TableDefinition',
    TableMigration =  'TableMigration',
    LegacyMigrationQueue =  'LegacyMigrationQueue',
    TableView =  'TableView',
    ViewChat =  'ViewChat',
    ContentChat =  'ContentChat',
    TableHistory =  'TableHistory',
    FieldDefinition =  'FieldDefinition',
    AccessKey =  'AccessKey',
    Product =  'Product',
    ResourceUserRole =  'ResourceUserRole',
    ResourceAccessKeyRole =  'ResourceAccessKeyRole',
    SupportTicket =  'SupportTicket',
    SupportTicketThread =  'SupportTicketThread',
    TranslationKeyContentManagement =  'TranslationKeyContentManagement',
    UserContact =  'UserContact',
    GroupUser =  'GroupUser',
    TableDefinitionApplication =  'TableDefinitionApplication',

}
export enum FieldValidatorEnum {
    id =  'id',
    text =  'text',
    longText =  'longText',
    boolean =  'boolean',
    integer =  'integer',
    filePath =  'filePath',
    jSON =  'jSON',
    enum =  'enum',
    i18N =  'i18N',
    userName =  'userName',
    email =  'email',
    firstName =  'firstName',
    lastName =  'lastName',
    fullName =  'fullName',
    phoneNumber =  'phoneNumber',
    password =  'password',
    city =  'city',
    country =  'country',
    salt =  'salt',
    owner =  'owner',
    createdAt =  'createdAt',
    updatedAt =  'updatedAt',
    dateTime =  'dateTime',
    uRL =  'uRL',
    imageURL =  'imageURL',
    fileURL =  'fileURL',
    referenceOneToOne =  'referenceOneToOne',
    referenceOneToMany =  'referenceOneToMany',
    referenceManyToOne =  'referenceManyToOne',
    referenceManyToMany =  'referenceManyToMany',
    uUID =  'uUID',
    mimeType =  'mimeType',
    file =  'file',
    money =  'money',
    snapshot =  'snapshot',
    currentPoint =  'currentPoint',
    tableDefinition =  'tableDefinition',
    path =  'path',
    name =  'name',
    config =  'config',
    type =  'type',
    contentManagement =  'contentManagement',
    reusable =  'reusable',
    translationKey =  'translationKey',
    i18n =  'i18n',
    translation =  'translation',
    legacyId =  'legacyId',
    passwordSalt =  'passwordSalt',
    tableView =  'tableView',
    contact =  'contact',
    forgotPasswordToken =  'forgotPasswordToken',
    forgotPasswordTokenCreated =  'forgotPasswordTokenCreated',
    changeEmailToken =  'changeEmailToken',
    newEmail =  'newEmail',
    changeEmailTokenCreated =  'changeEmailTokenCreated',
    deleted =  'deleted',
    status =  'status',
    termsAndConditionsAccepted =  'termsAndConditionsAccepted',
    avatarUrl =  'avatarUrl',
    user =  'user',
    role =  'role',
    group =  'group',
    entityID =  'entityID',
    permission =  'permission',
    inviteKey =  'inviteKey',
    acceptedInvite =  'acceptedInvite',
    description =  'description',
    fileReference =  'fileReference',
    template =  'template',
    category =  'category',
    database =  'database',
    server =  'server',
    icon =  'icon',
    parent =  'parent',
    application =  'application',
    tableHistory =  'tableHistory',
    before =  'before',
    after =  'after',
    action =  'action',
    fieldDefinition =  'fieldDefinition',
    credentials =  'credentials',
    callback =  'callback',
    totalRows =  'totalRows',
    rowsDone =  'rowsDone',
    migrationResult =  'migrationResult',
    dataConfig =  'dataConfig',
    viewChat =  'viewChat',
    message =  'message',
    contentId =  'contentId',
    definition =  'definition',
    customType =  'customType',
    ordering =  'ordering',
    required =  'required',
    detailsOnly =  'detailsOnly',
    minimum =  'minimum',
    maximum =  'maximum',
    system =  'system',
    defaultValue =  'defaultValue',
    indexed =  'indexed',
    key =  'key',
    price =  'price',
    expiredDate =  'expiredDate',
    userResourceName =  'userResourceName',
    resourceId =  'resourceId',
    resourceUserRole =  'resourceUserRole',
    accessKeyResourceName =  'accessKeyResourceName',
    accessKey =  'accessKey',
    resourceAccessKeyRole =  'resourceAccessKeyRole',
    secret =  'secret',
    supportTicket =  'supportTicket',
    author =  'author',

}
  
// this needs to have setErrors;
//   const [errors, setErrors] = useState<{ [key: string]: string|boolean }>({});
export async function frontendValidate(model: ModelValidatorEnum, field: FieldValidatorEnum, value: any, errors: { [key: string]: string | boolean }, setErrors: (value: { [key: string]: string | boolean }) => void, required?: boolean, setError?: (message: string) => void, minimum?: number, maximum?: number, config?: any): Promise<any> {
    let newErrors = { [field.toString()]: false, ...errors } as { [key: string]: string | boolean }
    try {
        value = await (Validator as any)[model.toString()][field.toString()](value, required, minimum, maximum, config)
    } catch (e: any) {
        if (e.isValidationError) {
            newErrors[field.toString()] = e.message
            if (setError) {
                setError(e.message)
            }
        } else {
            throw e
        }
    }
    setErrors(newErrors)
    return value
}


const Validator = {
    GenericTypes: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        text: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Text is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (value.length<(minimum??0)) throw new ValidationError('Text must be at least '+(minimum??0)+' characters')
            if (value.length>(maximum??1000)) throw new ValidationError('Text must be at most '+(maximum??1000)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        longText: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('LongText is required')
            else if (!required && !value) return undefined
            if (value.length<(minimum??0)) throw new ValidationError('LongText must be at least '+(minimum??0)+' characters')
            if (value.length>(maximum??100000)) throw new ValidationError('LongText must be at most '+(maximum??100000)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        boolean: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Boolean is required')
            else if (!required && !value) return undefined
        }, 
        integer: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('Integer is required')
            else if (!required && value!==0 && !value) return undefined
            if (value<(minimum??0)) throw new ValidationError('Integer must be at least '+(minimum??0))
            if (value>(maximum??2147483647)) throw new ValidationError('Integer must be at most '+(maximum??2147483647))
            return value
        }, 
        filePath: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('FilePath is required')
            else if (!required && !value) return undefined
            if (!value.match(/^([a-zA-Z0-9_\-\.\/]+)$/)) throw new ValidationError('FilePath must be a valid unix file path')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        jSON: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            if (typeof value === 'string') {
                if (!validator.isJSON(value)) throw new ValidationError('JSON must be a valid JSON')
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('JSON is required')
            else if (!required && !value) return undefined
            return value
        }, 
        enum: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Enum is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Enum is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['Option1', 'Option2', 'Option3']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Enum must be one of '+options.join(','))
            return value
        }, 
        i18N: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('I18N is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('I18N is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!locale.getByTag(value.replace('_', '-'))) throw new ValidationError('I18N must be a valid locale code')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            const sp = value.replace('_', '-').split('-')
            return sp[0].toLowerCase() + '-' + sp[1].toUpperCase()
        }, 
        userName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('UserName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('UserName must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('UserName must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        email: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Email is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Email is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isEmail(value)) throw new ValidationError('Email must be a valid email')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        firstName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('FirstName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('FirstName must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('FirstName must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        lastName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('LastName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('LastName must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('LastName must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        fullName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('FullName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('FullName must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('FullName must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        phoneNumber: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('PhoneNumber is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('PhoneNumber is required')
            else if (!required && value.trim().length === 0) return undefined
            value = value.replace(/[^0-9+]/g, '')
            if (!phone(value).isValid) throw new ValidationError('PhoneNumber must be a valid phone number')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        password: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Password is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Password is required')
            else if (!required && value.trim().length === 0) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Password must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('Password must be at most '+maximum+' characters')
            if (!value.match(/^([ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@\#\$%\^&\*\(\)_\+~`\|\}\{\[\]:;\?><\,\./\-=]+)$/)) throw new ValidationError('Password must contain only valid characters')
            return value
        }, 
        city: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('City is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('City must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('City must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        country: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Country is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Country is required')
            else if (!required && value.trim().length === 0) return undefined
            const country = countryLookup.byCountry(value) ?? countryLookup.byFips(value) ?? countryLookup.byIso(value) ?? countryLookup.byInternet(value) ?? countryLookup.byIso(value)
            if (!country) throw new ValidationError('Country must be a valid country code')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value.country
        }, 
        salt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Salt is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 15
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Salt must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('Salt must be at most '+maximum+' characters')
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        dateTime: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('DateTime is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('DateTime must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('DateTime must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        uRL: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('URL is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('URL is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isURL(value)) throw new ValidationError('URL must be a valid URL')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        imageURL: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('ImageURL is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('ImageURL is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isURL(value)) throw new ValidationError('ImageURL must be a valid URL')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        fileURL: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('FileURL is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('FileURL is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isURL(value)) throw new ValidationError('FileURL must be a valid URL')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        referenceOneToOneId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ReferenceOneToOne is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ReferenceOneToOne must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ReferenceOneToOne must be smaller than 2147483647')
            return value
        }, 
        referenceOneToManyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ReferenceOneToMany is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ReferenceOneToMany must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ReferenceOneToMany must be smaller than 2147483647')
            return value
        }, 
        referenceManyToOneId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ReferenceManyToOne is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ReferenceManyToOne must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ReferenceManyToOne must be smaller than 2147483647')
            return value
        }, 
        referenceManyToManyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ReferenceManyToMany is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ReferenceManyToMany must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ReferenceManyToMany must be smaller than 2147483647')
            return value
        }, 
        uUID: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('UUID is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('UUID is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isUUID(value)) throw new ValidationError('UUID must be a valid UUID')
            return value
        }, 
        mimeType: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('MimeType is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('MimeType is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isMimeType(value)) throw new ValidationError('MimeType must be a valid MimeType')
            return value
        }, 
        file: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('File is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('File is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!value.match(/^([a-zA-Z0-9_\-\.\/]+)$/)) throw new ValidationError('File must be a valid unix file path')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        money: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Money is required')
            else if (!required && !value) return undefined
            return value
        }, 
    },
    Snapshot: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        snapshot: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Snapshot is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Snapshot must be at least '+minimum+' characters')
            if (value.length>(maximum??16000000)) throw new ValidationError('Snapshot must be at most '+(maximum??16000000)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        currentPoint: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('CurrentPoint is required')
            else if (!required && !value) return undefined
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
        path: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Path is required')
            else if (!required && !value) return undefined
            if (!value.match(/^([a-zA-Z0-9_\-\.\/]+)$/)) throw new ValidationError('Path must be a valid unix file path')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
    },
    ContentManagement: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('Name must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        config: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            if (typeof value === 'string') {
                if (!validator.isJSON(value)) throw new ValidationError('Config must be a valid JSON')
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Config is required')
            else if (!required && !value) return undefined
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
    },
    TranslationKey: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('Name must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        type: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.TranslationKeyTypeEnum|undefined> => {
            value = value?value.toString():undefined
            if (value === undefined) value = 'Text'
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Type is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Type is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['Text', 'Html', 'Markdown', 'Image']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Type must be one of '+options.join(','))
            return value
        }, 
        contentManagementId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ContentManagement is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ContentManagement must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ContentManagement must be smaller than 2147483647')
            return value
        }, 
        config: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            if (typeof value === 'string') {
                if (!validator.isJSON(value)) throw new ValidationError('Config must be a valid JSON')
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Config is required')
            else if (!required && !value) return undefined
            return value
        }, 
        reusable: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Reusable is required')
            else if (!required && !value) return undefined
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
    },
    TranslationText: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        translationKeyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TranslationKey is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TranslationKey must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TranslationKey must be smaller than 2147483647')
            return value
        }, 
        i18n: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('I18n is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('I18n is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!locale.getByTag(value.replace('_', '-'))) throw new ValidationError('I18n must be a valid locale code')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            const sp = value.replace('_', '-').split('-')
            return sp[0].toLowerCase() + '-' + sp[1].toUpperCase()
        }, 
        translation: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Translation is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Translation must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Translation must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
    },
    User: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        userName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('UserName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('UserName must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('UserName must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        email: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Email is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Email is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isEmail(value)) throw new ValidationError('Email must be a valid email')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        firstName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('FirstName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('FirstName must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('FirstName must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        lastName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('LastName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('LastName must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('LastName must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        phoneNumber: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('PhoneNumber is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('PhoneNumber is required')
            else if (!required && value.trim().length === 0) return undefined
            value = value.replace(/[^0-9+]/g, '')
            if (!phone(value).isValid) throw new ValidationError('PhoneNumber must be a valid phone number')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        legacyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('LegacyId is required')
            else if (!required && value!==0 && !value) return undefined
            if (value<(minimum??1)) throw new ValidationError('LegacyId must be at least '+(minimum??1))
            if (value>(maximum??2147483647)) throw new ValidationError('LegacyId must be at most '+(maximum??2147483647))
            return value
        }, 
        city: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('City is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('City must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('City must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        country: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Country is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Country is required')
            else if (!required && value.trim().length === 0) return undefined
            const country = countryLookup.byCountry(value) ?? countryLookup.byFips(value) ?? countryLookup.byIso(value) ?? countryLookup.byInternet(value) ?? countryLookup.byIso(value)
            if (!country) throw new ValidationError('Country must be a valid country code')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value.country
        }, 
        password: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Password is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Password is required')
            else if (!required && value.trim().length === 0) return undefined
            if (value.length<(minimum??8)) throw new ValidationError('Password must be at least '+(minimum??8)+' characters')
            if (value.length>(maximum??70)) throw new ValidationError('Password must be at most '+(maximum??70)+' characters')
            if (!value.match(/^([ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@\#\$%\^&\*\(\)_\+~`\|\}\{\[\]\\:;\?><\,\./\-=]+)$/)) throw new ValidationError('Password must contain only valid characters')
            if (!value.match(/([ABCDEFGHIJKLMNOPQRSTUVWXYZ])/g) || value.match(/([ABCDEFGHIJKLMNOPQRSTUVWXYZ])/g).length<1) throw new ValidationError('Password must contain at least 1 capital letters')
            if (!value.match(/([0123456789])/g) || value.match(/([0123456789])/g).length<1) throw new ValidationError('Password must contain at least 1 numbers')
            if (!value.match(/([!@\#\$%\^&\*\(\)_\+~`\|\}\{\[\]\\:;\?><\,\./\-=])/g) || value.match(/([!@\#\$%\^&\*\(\)_\+~`\|\}\{\[\]\\:;\?><\,\./\-=])/g).length<1) throw new ValidationError('Password must contain at least 1 special characters')
            return value
        }, 
        passwordSalt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('PasswordSalt is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 15
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('PasswordSalt must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('PasswordSalt must be at most '+maximum+' characters')
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
        contactId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Contact is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Contact must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Contact must be smaller than 2147483647')
            return value
        }, 
        forgotPasswordToken: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('ForgotPasswordToken is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('ForgotPasswordToken must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('ForgotPasswordToken must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        forgotPasswordTokenCreated: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ForgotPasswordTokenCreated is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('ForgotPasswordTokenCreated must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('ForgotPasswordTokenCreated must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        changeEmailToken: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('ChangeEmailToken is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('ChangeEmailToken must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('ChangeEmailToken must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        newEmail: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('NewEmail is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('NewEmail is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isEmail(value)) throw new ValidationError('NewEmail must be a valid email')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        changeEmailTokenCreated: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ChangeEmailTokenCreated is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('ChangeEmailTokenCreated must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('ChangeEmailTokenCreated must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        deleted: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Deleted is required')
            else if (!required && !value) return undefined
        }, 
        status: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.UserStatusEnum|undefined> => {
            value = value?value.toString():undefined
            if (value === undefined) value = 'InActive'
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Status is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Status is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['InActive', 'Active', 'Suspended', 'ActivationPending']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Status must be one of '+options.join(','))
            return value
        }, 
        termsAndConditionsAccepted: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TermsAndConditionsAccepted is required')
            else if (!required && !value) return undefined
        }, 
        avatarUrl: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('AvatarUrl is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('AvatarUrl must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('AvatarUrl must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    Role: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Name must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    UserRole: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
    },
    UserTableDefinition: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
    },
    UserTableView: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
    },
    GroupTableView: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        groupId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Group is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Group must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Group must be smaller than 2147483647')
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
    },
    RolePermission: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        entityID: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('EntityID is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('EntityID is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isUUID(value)) throw new ValidationError('EntityID must be a valid UUID')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        permissionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Permission is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Permission must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Permission must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
    },
    Invite: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        inviteKey: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('InviteKey is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('InviteKey must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('InviteKey must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        acceptedInvite: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('AcceptedInvite is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('AcceptedInvite must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('AcceptedInvite must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    Group: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Name must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Description must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    Permission: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Name must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    Application: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Name must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Description must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    File: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Name must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        mimeType: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('MimeType is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('MimeType is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isMimeType(value)) throw new ValidationError('MimeType must be a valid MimeType')
            return value
        }, 
        fileReference: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('fileReference is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('fileReference must be at least '+minimum+' characters')
            if (value.length>(maximum??200)) throw new ValidationError('fileReference must be at most '+(maximum??200)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    TableDefinition: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('Name must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Description must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        legacyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('LegacyId is required')
            else if (!required && value!==0 && !value) return undefined
            if (value<(minimum??1)) throw new ValidationError('LegacyId must be at least '+(minimum??1))
            if (value>(maximum??2147483647)) throw new ValidationError('LegacyId must be at most '+(maximum??2147483647))
            return value
        }, 
        template: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Template is required')
            else if (!required && !value) return undefined
        }, 
        category: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.TableDefinitionCategoryEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Category is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Category is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['Content', 'Events', 'HRRecruiting', 'Marketing', 'Communications', 'Design', 'ProjectManagement', 'RemoteWork', 'SalesCustomers', 'SoftwareDevelopment']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Category must be one of '+options.join(','))
            return value
        }, 
        database: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Database is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Database must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Database must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        server: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Server is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Server must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Server must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        icon: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Icon is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Icon is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isURL(value)) throw new ValidationError('Icon must be a valid URL')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        parentId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Parent is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Parent must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Parent must be smaller than 2147483647')
            return value
        }, 
        applicationId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Application is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Application must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Application must be smaller than 2147483647')
            return value
        }, 
        tableHistoryId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableHistory is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableHistory must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableHistory must be smaller than 2147483647')
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
        deleted: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Deleted is required')
            else if (!required && !value) return undefined
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
    },
    TableMigration: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        before: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Before is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Before must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('Before must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        after: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('After is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('After must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('After must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        action: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.TableMigrationActionEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Action is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Action is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['AddTable', 'UpdateTableName', 'RemoveTable', 'AddColumn', 'RemoveColumn', 'UpdateColumnName', 'UpdateColumnType', 'AddRelation', 'RemoveRelation']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Action must be one of '+options.join(','))
            return value
        }, 
        status: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.TableMigrationStatusEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Status is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Status is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['Pending', 'Running', 'Success', 'Error']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Status must be one of '+options.join(','))
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
        fieldDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('FieldDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('FieldDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('FieldDefinition must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
    },
    LegacyMigrationQueue: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        legacyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && value!==0 && !value) throw new ValidationError('LegacyId is required')
            else if (!required && value!==0 && !value) return undefined
            if (value<(minimum??1)) throw new ValidationError('LegacyId must be at least '+(minimum??1))
            if (value>(maximum??20000000)) throw new ValidationError('LegacyId must be at most '+(maximum??20000000))
            return value
        }, 
        credentials: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            if (typeof value === 'string') {
                if (!validator.isJSON(value)) throw new ValidationError('Credentials must be a valid JSON')
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Credentials is required')
            else if (!required && !value) return undefined
            return value
        }, 
        callback: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Callback is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Callback is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isURL(value)) throw new ValidationError('Callback must be a valid URL')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        status: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.LegacyMigrationQueueStatusEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Status is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Status is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['Pending', 'Running', 'Success', 'Error']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Status must be one of '+options.join(','))
            return value
        }, 
        totalRows: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (value === undefined) value = 0
            if (required === undefined) required = true
            if (required && value!==0 && !value) throw new ValidationError('TotalRows is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('TotalRows must be at least '+minimum)
            if (value>(maximum??20000000)) throw new ValidationError('TotalRows must be at most '+(maximum??20000000))
            return value
        }, 
        rowsDone: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (value === undefined) value = 0
            if (required === undefined) required = true
            if (required && value!==0 && !value) throw new ValidationError('RowsDone is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('RowsDone must be at least '+minimum)
            if (value>(maximum??20000000)) throw new ValidationError('RowsDone must be at most '+(maximum??20000000))
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
        migrationResult: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('migrationResult is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('migrationResult must be at least '+minimum+' characters')
            if (value.length>(maximum??2000000)) throw new ValidationError('migrationResult must be at most '+(maximum??2000000)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
    },
    TableView: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('Name must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        type: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.TableViewTypeEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Type is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Type is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['List', 'Calendar', 'KanBan', 'Gallery', 'TimeLine', 'Gantt', 'Map']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Type must be one of '+options.join(','))
            return value
        }, 
        template: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Template is required')
            else if (!required && !value) return undefined
        }, 
        category: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.TableViewCategoryEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Category is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Category is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['Content', 'Events', 'HRRecruiting', 'Marketing', 'Communications', 'Design', 'ProjectManagement', 'RemoteWork', 'SalesCustomers', 'SoftwareDevelopment']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Category must be one of '+options.join(','))
            return value
        }, 
        icon: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Icon is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Icon is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isURL(value)) throw new ValidationError('Icon must be a valid URL')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Description must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        config: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            if (typeof value === 'string') {
                if (!validator.isJSON(value)) throw new ValidationError('Config must be a valid JSON')
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Config is required')
            else if (!required && !value) return undefined
            return value
        }, 
        dataConfig: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            if (typeof value === 'string') {
                if (!validator.isJSON(value)) throw new ValidationError('DataConfig must be a valid JSON')
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('DataConfig is required')
            else if (!required && !value) return undefined
            return value
        }, 
        deleted: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Deleted is required')
            else if (!required && !value) return undefined
        }, 
        viewChatId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('ViewChat is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ViewChat must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ViewChat must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
    },
    ViewChat: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        message: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Message is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Message must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Message must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        contentId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('ContentId is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('ContentId must be at least '+minimum)
            if (value>(maximum??2147483647)) throw new ValidationError('ContentId must be at most '+(maximum??2147483647))
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
    },
    ContentChat: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        contentId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('ContentId is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('ContentId must be at least '+minimum)
            if (value>(maximum??2147483647)) throw new ValidationError('ContentId must be at most '+(maximum??2147483647))
            return value
        }, 
        message: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Message is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Message must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Message must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    TableHistory: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        definition: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Definition is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Definition must be at least '+minimum+' characters')
            if (value.length>(maximum??16000000)) throw new ValidationError('Definition must be at most '+(maximum??16000000)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        snapshot: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Snapshot is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Snapshot is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!value.match(/^([a-zA-Z0-9_\-\.\/]+)$/)) throw new ValidationError('Snapshot must be a valid unix file path')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
    },
    FieldDefinition: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('Name must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        customType: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('CustomType is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('CustomType must be at least '+minimum+' characters')
            if (value.length>(maximum??250)) throw new ValidationError('CustomType must be at most '+(maximum??250)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        type: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.FieldDefinitionTypeEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Type is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Type is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['Text', 'Integer', 'Decimal', 'Date', 'Time', 'DateTime', 'Money', 'Boolean', 'File', 'Image', 'Choice', 'Float', 'Double', 'Percentage', 'Lookup']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Type must be one of '+options.join(','))
            return value
        }, 
        ordering: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (value === undefined) value = 0
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('Ordering is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('Ordering must be at least '+minimum)
            if (value>(maximum??1000)) throw new ValidationError('Ordering must be at most '+(maximum??1000))
            return value
        }, 
        required: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Required is required')
            else if (!required && !value) return undefined
        }, 
        detailsOnly: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('DetailsOnly is required')
            else if (!required && !value) return undefined
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Description must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        minimum: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('Minimum is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('Minimum must be at least '+minimum)
            if (value>(maximum??2147483647)) throw new ValidationError('Minimum must be at most '+(maximum??2147483647))
            return value
        }, 
        maximum: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('Maximum is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('Maximum must be at least '+minimum)
            if (value>(maximum??2147483647)) throw new ValidationError('Maximum must be at most '+(maximum??2147483647))
            return value
        }, 
        legacyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && value!==0 && !value) throw new ValidationError('LegacyId is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('LegacyId must be at least '+minimum)
            if (value>(maximum??2147483647)) throw new ValidationError('LegacyId must be at most '+(maximum??2147483647))
            return value
        }, 
        config: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<any|undefined> => {
            if (typeof value === 'string') {
                if (!validator.isJSON(value)) throw new ValidationError('Config must be a valid JSON')
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Config is required')
            else if (!required && !value) return undefined
            return value
        }, 
        system: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('System is required')
            else if (!required && !value) return undefined
        }, 
        icon: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Icon is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Icon is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isURL(value)) throw new ValidationError('Icon must be a valid URL')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        deleted: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Deleted is required')
            else if (!required && !value) return undefined
        }, 
        defaultValue: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('DefaultValue is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('DefaultValue must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('DefaultValue must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        indexed: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<boolean|undefined> => {
            if (value === undefined) value = false
            if (value===true || value===false) return value
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true'
            }
            if (typeof value === 'number') {
                return value !== 0
            }
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Indexed is required')
            else if (!required && !value) return undefined
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    AccessKey: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        key: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Key is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Key must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Key must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Description must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        tableViewId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableView is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableView must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableView must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    Product: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (value.length>(maximum??50)) throw new ValidationError('Name must be at most '+(maximum??50)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = false
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (value.length>(maximum??65535)) throw new ValidationError('Description must be at most '+(maximum??65535)+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        price: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Price is required')
            else if (!required && !value) return undefined
            return value
        }, 
        expiredDate: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ExpiredDate is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('ExpiredDate must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('ExpiredDate must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    ResourceUserRole: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        userResourceName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.ResourceUserRoleUserResourceNameEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('UserResourceName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('UserResourceName is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['All', 'Dynamic', 'User', 'Role', 'TableDefinition', 'TableMigration', 'FieldDefinition']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('UserResourceName must be one of '+options.join(','))
            return value
        }, 
        resourceId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && value!==0 && !value) throw new ValidationError('ResourceId is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('ResourceId must be at least '+minimum)
            if (value>(maximum??2147483647)) throw new ValidationError('ResourceId must be at most '+(maximum??2147483647))
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        parentId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Parent is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Parent must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Parent must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        resourceUserRoleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ResourceUserRole is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ResourceUserRole must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ResourceUserRole must be smaller than 2147483647')
            return value
        }, 
    },
    ResourceAccessKeyRole: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        accessKeyResourceName: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.ResourceAccessKeyRoleAccessKeyResourceNameEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('AccessKeyResourceName is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('AccessKeyResourceName is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['All', 'Dynamic', 'User', 'Role', 'TableDefinition', 'TableMigration', 'FieldDefinition']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('AccessKeyResourceName must be one of '+options.join(','))
            return value
        }, 
        resourceId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && value!==0 && !value) throw new ValidationError('ResourceId is required')
            else if (!required && value!==0 && !value) return undefined
            if (minimum !== undefined && value<minimum) throw new ValidationError('ResourceId must be at least '+minimum)
            if (value>(maximum??2147483647)) throw new ValidationError('ResourceId must be at most '+(maximum??2147483647))
            return value
        }, 
        accessKeyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('AccessKey is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('AccessKey must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('AccessKey must be smaller than 2147483647')
            return value
        }, 
        roleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Role is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Role must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Role must be smaller than 2147483647')
            return value
        }, 
        parentId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Parent is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Parent must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Parent must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        resourceAccessKeyRoleId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('ResourceAccessKeyRole is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ResourceAccessKeyRole must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ResourceAccessKeyRole must be smaller than 2147483647')
            return value
        }, 
    },
    SupportTicket: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        name: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Name is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Name must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('Name must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        email: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Email is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Email is required')
            else if (!required && value.trim().length === 0) return undefined
            if (!validator.isEmail(value)) throw new ValidationError('Email must be a valid email')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        category: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.SupportTicketCategoryEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Category is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Category is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['General', 'Billing', 'Technical', 'Other']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Category must be one of '+options.join(','))
            return value
        }, 
        description: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Description is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Description must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('Description must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        status: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<prismaTypes.SupportTicketStatusEnum|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Status is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (required && value.trim().length === 0) throw new ValidationError('Status is required')
            else if (!required && value.trim().length === 0) return undefined
            let options = ['New', 'Open', 'Resolved']
            if (config && config.options) options = config.options
            if (!options.includes(value)) throw new ValidationError('Status must be one of '+options.join(','))
            return value
        }, 
        secret: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Secret is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Secret must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('Secret must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
    },
    SupportTicketThread: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        supportTicketId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('SupportTicket is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('SupportTicket must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('SupportTicket must be smaller than 2147483647')
            return value
        }, 
        message: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Message is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Message must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('Message must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        author: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<string|undefined> => {
            value = value?value.toString():undefined
            if (required === undefined) required = true
            // could be an empty string, which is ! in JS...
            if (required && typeof value !== 'string' && !value) throw new ValidationError('Author is required')
            else if (!required && typeof value !== 'string' && !value) return undefined
            if (minimum === undefined) minimum = 3
            if (maximum === undefined) maximum = 30
            if (minimum !== undefined && value.length<minimum) throw new ValidationError('Author must be at least '+minimum+' characters')
            if (maximum !== undefined && value.length>maximum) throw new ValidationError('Author must be at most '+maximum+' characters')
            value = sanitizeHtml(value, {allowedTags: ['b','i','em','strong','a','p','ul','ol','li','h1','h2','h3','h4','h5']})
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        ownerId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Owner is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Owner must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Owner must be smaller than 2147483647')
            return value
        }, 
    },
    TranslationKeyContentManagement: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        translationKeyId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TranslationKey is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TranslationKey must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TranslationKey must be smaller than 2147483647')
            return value
        }, 
        contentManagementId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('ContentManagement is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('ContentManagement must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('ContentManagement must be smaller than 2147483647')
            return value
        }, 
    },
    UserContact: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
        contactId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Contact is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Contact must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Contact must be smaller than 2147483647')
            return value
        }, 
    },
    GroupUser: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        groupId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Group is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Group must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Group must be smaller than 2147483647')
            return value
        }, 
        userId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('User is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('User must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('User must be smaller than 2147483647')
            return value
        }, 
    },
    TableDefinitionApplication: {
        id: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('Id is required')
            else if (!required && !value) return undefined
            if (!(value>0)) throw new ValidationError('Id must be greater than zero')
            if (!(value<=2147483647)) throw new ValidationError('Id must be smaller than 2147483647')
            return value
        }, 
        createdAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('CreatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('CreatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('CreatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        updatedAt: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<Date|undefined> => {
            if (required === undefined) required = false
            if (required && !value) throw new ValidationError('UpdatedAt is required')
            else if (!required && !value) return undefined
            if (typeof value === 'string') {
                try {
                    value = moment(value).toDate()
                } catch (e) {
                    throw new ValidationError('UpdatedAt must be a valid date time')
                }
            }
            if (isNaN(value.getTime())) throw new ValidationError('UpdatedAt must be a valid date time')
            if (value.getTime()===0) return undefined
            return value
        }, 
        tableDefinitionId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('TableDefinition is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('TableDefinition must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('TableDefinition must be smaller than 2147483647')
            return value
        }, 
        applicationId: async (value: any, required?: boolean, minimum?: number, maximum?: number, config?: any):Promise<number|undefined> => {
            value = parseInt(value)
            if (required === undefined) required = true
            if (required && !value) throw new ValidationError('Application is required')
            else if (!required && !value) return undefined
            if (value<1) throw new ValidationError('Application must be at least 1')
            if (!(value<=2147483647)) throw new ValidationError('Application must be smaller than 2147483647')
            return value
        }, 
    },

}
export default Validator;
