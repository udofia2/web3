// ::::::::::::::::::::::::: Get User Profile Docs :::::::::::::::::::::::::
/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the authenticated user's complete profile information including account metadata.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 responseCode:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "User profile retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cuid123456789"
 *                       description: Unique user identifier
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     otherNames:
 *                       type: string
 *                       nullable: true
 *                       example: "Michael"
 *                     phoneNumber:
 *                       type: string
 *                       nullable: true
 *                       example: "+1234567890"
 *                     title:
 *                       type: string
 *                       example: "Mr."
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john.doe@example.com"
 *                       description: User's email address
 *                     emailVerified:
 *                       type: boolean
 *                       example: true
 *                       description: Whether the email has been verified
 *                     status:
 *                       type: string
 *                       example: "ACTIVE"
 *                       description: Account status
 *                       enum: ["ACTIVE", "INACTIVE", "SUSPENDED", "RESTRICTED"]
 *                     authLevel:
 *                       type: string
 *                       example: "USER"
 *                       description: User's authorization level
 *                       enum: ["USER", "ADMIN", "SUPER_ADMIN"]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-20T14:45:00.000Z"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "401"
 *                 message:
 *                   type: string
 *             examples:
 *               missingToken:
 *                 summary: Missing authentication token
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "401"
 *                   message: "Token not found in request"
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "401"
 *                   message: "Invalid or expired token"
 *       404:
 *         description: User profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "404"
 *                 message:
 *                   type: string
 *                   example: "User profile not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "500"
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */

// ::::::::::::::::::::::::: User Profile Management Docs :::::::::::::::::::::::::
/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
 *     description: Updates the authenticated user's profile information. At least one field must be provided.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: John
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 50
 *                 example: Doe
 *                 description: User's last name
 *               otherNames:
 *                 type: string
 *                 maxLength: 100
 *                 example: Michael
 *                 description: User's other names (optional)
 *               phoneNumber:
 *                 type: string
 *                 pattern: '^\+?[1-9]\d{1,14}$'
 *                 example: "+1234567890"
 *                 description: User's phone number in international format
 *               title:
 *                 type: string
 *                 maxLength: 20
 *                 example: Mr.
 *                 description: User's title (Mr., Mrs., Dr., etc.)
 *             minProperties: 1
 *             additionalProperties: false
 *           examples:
 *             updateFirstName:
 *               summary: Update first name only
 *               value:
 *                 firstName: "Jane"
 *             updateFullProfile:
 *               summary: Update full profile
 *               value:
 *                 firstName: "Jane"
 *                 lastName: "Smith"
 *                 otherNames: "Elizabeth"
 *                 phoneNumber: "+1234567890"
 *                 title: "Dr."
 *             updatePhoneOnly:
 *               summary: Update phone number only
 *               value:
 *                 phoneNumber: "+1987654321"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 responseCode:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "cuid123456789"
 *                       description: Unique user identifier
 *                     firstName:
 *                       type: string
 *                       example: "Jane"
 *                     lastName:
 *                       type: string
 *                       example: "Smith"
 *                     otherNames:
 *                       type: string
 *                       nullable: true
 *                       example: "Elizabeth"
 *                     phoneNumber:
 *                       type: string
 *                       nullable: true
 *                       example: "+1234567890"
 *                     title:
 *                       type: string
 *                       example: "Dr."
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-20T14:45:00.000Z"
 *       400:
 *         description: Bad request - Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "400"
 *                 message:
 *                   type: string
 *             examples:
 *               noFieldsProvided:
 *                 summary: No fields provided for update
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "At least one field must be provided for update"
 *               invalidPhoneNumber:
 *                 summary: Invalid phone number format
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "Invalid phone number format"
 *               fieldTooShort:
 *                 summary: Field below minimum length
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "First name must be at least 2 characters"
 *               fieldTooLong:
 *                 summary: Field exceeds maximum length
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "First name too long"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "401"
 *                 message:
 *                   type: string
 *             examples:
 *               missingToken:
 *                 summary: Missing authentication token
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "401"
 *                   message: "Token not found in request"
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "401"
 *                   message: "Invalid or expired token"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "404"
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "500"
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */

// ::::::::::::::::::::::::: Change Password :::::::::::::::::::::::::
/**
 * @swagger
 * /user/change-password:
 *   put:
 *     summary: Change user password
 *     description: Allows authenticated users to change their password. Requires current password verification and enforces strong password policy. Rate limited to 5 attempts per 15 minutes.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 format: password
 *                 description: Current password for verification
 *                 example: "CurrentPass123!"
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character
 *                 example: "NewSecurePass123!"
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Must match the new password exactly
 *                 example: "NewSecurePass123!"
 *             required: ["oldPassword", "newPassword", "confirmPassword"]
 *             additionalProperties: false
 *           examples:
 *             changePassword:
 *               summary: Complete password change request
 *               value:
 *                 oldPassword: "CurrentPass123!"
 *                 newPassword: "NewSecurePass123!"
 *                 confirmPassword: "NewSecurePass123!"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 responseCode:
 *                   type: string
 *                   example: "00"
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully"
 *                 data:
 *                   type: null
 *                   example: null
 *                   description: No data returned for security reasons
 *       400:
 *         description: Bad request - Validation errors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "400"
 *                 message:
 *                   type: string
 *             examples:
 *               passwordMismatch:
 *                 summary: New password and confirm password don't match
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "New password and confirm password do not match"
 *               weakPassword:
 *                 summary: Password doesn't meet security requirements
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
 *               samePassword:
 *                 summary: New password same as old password
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "New password must be different from old password"
 *               passwordTooShort:
 *                 summary: Password below minimum length
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "new password must be at least 8 characters long"
 *               missingFields:
 *                 summary: Required fields missing
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "old password is required"
 *       401:
 *         description: Unauthorized - Authentication or verification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "401"
 *                 message:
 *                   type: string
 *             examples:
 *               missingToken:
 *                 summary: Missing authentication token
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "401"
 *                   message: "Token not found in request"
 *               invalidToken:
 *                 summary: Invalid or expired token
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "401"
 *                   message: "Invalid or expired token"
 *               wrongOldPassword:
 *                 summary: Current password is incorrect
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "401"
 *                   message: "Old password is incorrect"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "404"
 *                 message:
 *                   type: string
 *                   example: "User not found"
 *       429:
 *         description: Too many requests - Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 429
 *                 message:
 *                   type: string
 *                   example: "Too many request"
 *             examples:
 *               rateLimitExceeded:
 *                 summary: Rate limit exceeded
 *                 value:
 *                   status: 429
 *                   message: "Too many request"
 *                 description: "Maximum 5 password change attempts allowed per 15 minutes"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: string
 *                   example: "500"
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 */


// ::::::::::::::::::::::::: Set Transaction PIN :::::::::::::::::::::::::
/**
 * @swagger
 * /user/set-transaction-pin:
 *   put:
 *     summary: Set transaction PIN
 *     description: Sets a secure 4-digit PIN for transaction authorization. PIN is encrypted before storage.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *                 pattern: '^\\d{4}$'
 *                 description: 4-digit numeric PIN
 *                 example: "1234"
 *               confirmPin:
 *                 type: string
 *                 pattern: '^\\d{4}$'
 *                 description: Must match the PIN
 *                 example: "1234"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Current account password for verification
 *                 example: "CurrentPass123!"
 *             required: ["pin", "confirmPin", "password"]
 *     responses:
 *       200:
 *         description: PIN set successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Invalid password or authentication
 */


// ::::::::::::::::::::::::: Request PIN Reset :::::::::::::::::::::::::
/**
 * @swagger
 * /user/request-pin-reset:
 *   post:
 *     summary: Request PIN reset OTP
 *     description: Initiates PIN reset process by sending OTP to registered email or phone
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               method:
 *                 type: string
 *                 enum: [email, sms]
 *                 example: "email"
 *             required: ["method"]
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Authentication required
 */

// ::::::::::::::::::::::::: Verify PIN Reset OTP :::::::::::::::::::::::::
/**
 * @swagger
 * /user/verify-pin-reset-otp:
 *   post:
 *     summary: Verify PIN reset OTP
 *     description: Verifies the OTP sent for PIN reset
 *     tags:
 *       - User Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: "uuid-session-id"
 *               otp:
 *                 type: string
 *                 pattern: '^\\d{6}$'
 *                 example: "123456"
 *             required: ["sessionId", "otp"]
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       401:
 *         description: Invalid or expired OTP
 */

// ::::::::::::::::::::::::: Reset Transaction PIN :::::::::::::::::::::::::
/**
 * @swagger
 * /user/reset-transaction-pin:
 *   put:
 *     summary: Reset transaction PIN
 *     description: Resets transaction PIN after OTP verification
 *     tags:
 *       - User Management
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: string
 *                 example: "uuid-session-id"
 *               newPin:
 *                 type: string
 *                 pattern: '^\\d{4}$'
 *                 example: "1234"
 *               confirmPin:
 *                 type: string
 *                 pattern: '^\\d{4}$'
 *                 example: "1234"
 *             required: ["sessionId", "newPin", "confirmPin"]
 *     responses:
 *       200:
 *         description: PIN reset successfully
 *       400:
 *         description: Validation errors
 *       401:
 *         description: Invalid session or OTP not verified
 */