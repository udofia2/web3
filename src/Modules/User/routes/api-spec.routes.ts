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
