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
 *         description: User profile retrieved successfully
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
 *                   $ref: '#/components/schemas/UserProfileResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * // ::::::::::::::::::::::::: Update User Profile Docs :::::::::::::::::::::::::
 *   put:
 *     summary: Update user profile
 *     description: Updates the authenticated user's profile information. At least one field must be provided. Both PUT and PATCH methods are supported for this endpoint.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
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
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   patch:
 *     summary: Update user profile (partial)
 *     description: Partially updates the authenticated user's profile information. Same functionality as PUT but semantically indicates partial update.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileRequest'
 *           example:
 *             title: "Ms."
 *             phoneNumber: "+1987654321"
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
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// ::::::::::::::::::::::::: Additional User Endpoints (if they exist) :::::::::::::::::::::::::

/**
 * @swagger
 * /user/preferences:
 *   get:
 *     summary: Get user preferences
 *     description: Retrieves the authenticated user's account preferences and settings.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
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
 *                   example: "User preferences retrieved successfully"
 *                 data:
 *                   $ref: '#/components/schemas/UserPreferences'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   put:
 *     summary: Update user preferences
 *     description: Updates the authenticated user's account preferences and settings.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePreferencesRequest'
 *     responses:
 *       200:
 *         description: Preferences updated successfully
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
 *                   example: "Preferences updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/UserPreferences'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /user/avatar:
 *   post:
 *     summary: Upload user avatar
 *     description: Uploads a new profile picture for the authenticated user.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Image file (JPEG, PNG, WebP supported, max 5MB)
 *             required:
 *               - avatar
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
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
 *                   example: "Avatar uploaded successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     avatarUrl:
 *                       type: string
 *                       example: "https://cdn.example.com/avatars/user123.jpg"
 *       400:
 *         description: Bad request - Invalid file or file too large
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidFile:
 *                 summary: Invalid file format
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "Only JPEG, PNG, and WebP images are allowed"
 *               fileTooLarge:
 *                 summary: File too large
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "File size must not exceed 5MB"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     summary: Remove user avatar
 *     description: Removes the authenticated user's profile picture.
 *     tags:
 *       - User Management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Avatar removed successfully
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
 *                   example: "Avatar removed successfully"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         description: No avatar found to remove
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               status: false
 *               error: true
 *               statusCode: "404"
 *               message: "No avatar found"
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

/**
 * @swagger
 * /user/deactivate:
 *   post:
 *     summary: Deactivate user account
 *     description: Deactivates the authenticated user's account. This action requires password confirmation.
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
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Current account password for confirmation
 *                 example: "CurrentPassword123!"
 *               reason:
 *                 type: string
 *                 description: Optional reason for deactivation
 *                 example: "Taking a break from the platform"
 *                 maxLength: 500
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Account deactivated successfully
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
 *                   example: "Account deactivated successfully"
 *       400:
 *         description: Bad request - Invalid password or missing data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               wrongPassword:
 *                 summary: Incorrect password
 *                 value:
 *                   status: false
 *                   error: true
 *                   statusCode: "400"
 *                   message: "Incorrect password"
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */