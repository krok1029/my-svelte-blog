<script lang="ts">
        import { User2, Menu, X } from 'lucide-svelte';
        import { page } from '$app/state';
        import type { Page } from '@sveltejs/kit';
        import { navbarList } from '$lib/const';
        import SunIcon from '@lucide/svelte/icons/sun';
        import MoonIcon from '@lucide/svelte/icons/moon';

        import { toggleMode } from 'mode-watcher';
        import { Button } from '$lib/components/ui/button';
        import {
                Collapsible,
                CollapsibleTrigger,
                CollapsibleContent
        } from '$lib/components/ui/collapsible';
        import {
                DropdownMenu,
                DropdownMenuTrigger,
                DropdownMenuContent,
                DropdownMenuItem,
                DropdownMenuSeparator
        } from '$lib/components/ui/dropdown-menu';
        import { authUser } from '$lib/authStore';
        import { goto } from '$app/navigation';
        import { signOut } from 'firebase/auth';
        import { firebaseAuth } from '$lib/firebase';

        let mobileOpen = $state(false);

        const checkCurrentUrl = (current: Page, url: string) =>
                current.url.pathname === url
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100';

        const handleLogout = () => {
                signOut(firebaseAuth)
                        .then(() => {
                                $authUser = undefined;
                                goto('/login');
                        })
                        .catch((error) => {
                                console.error(error);
                        });
        };
</script>

<Collapsible
        bind:open={mobileOpen}
        class="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm"
>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="relative flex h-16 items-center justify-between">
                        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                                {#if mobileOpen}
                                                        <X class="h-6 w-6" />
                                                {:else}
                                                        <Menu class="h-6 w-6" />
                                                {/if}
                                                <span class="sr-only">Toggle main menu</span>
                                        </Button>
                                </CollapsibleTrigger>
                        </div>

                        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div class="flex flex-shrink-0 items-center">
                                        <a
                                                href="/"
                                                class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
                                        >
                                                李明峯
                                        </a>
                                </div>
                                <div class="hidden sm:ml-8 sm:block">
                                        <div class="flex space-x-1">
                                                {#each navbarList as navbar}
                                                        <a
                                                                href={navbar.link}
                                                                class="rounded-lg px-3 py-2 text-sm font-medium transition-colors {checkCurrentUrl(
                                                                        page,
                                                                        navbar.link
                                                                )}"
                                                        >
                                                                {navbar.text}
                                                        </a>
                                                {/each}
                                        </div>
                                </div>
                        </div>

                        <Button onclick={toggleMode} variant="outline" size="icon">
                                <SunIcon
                                        class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
                                />
                                <MoonIcon
                                        class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
                                />
                                <span class="sr-only">Toggle theme</span>
                        </Button>

                        <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                        <Button
                                                variant="ghost"
                                                size="icon"
                                                class="rounded-full"
                                                id="user-menu-button"
                                        >
                                                <User2 class="h-6 w-6" />
                                                <span class="sr-only">Open user menu</span>
                                        </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" class="w-48">
                                        {#if $authUser}
                                                <DropdownMenuItem on:select={() => goto('/')}>Your Profile</DropdownMenuItem>
                                                <DropdownMenuItem on:select={() => goto('/admin')}>Admin</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem on:select={handleLogout}>Logout</DropdownMenuItem>
                                        {:else}
                                                <DropdownMenuItem on:select={() => goto('/login')}>Login</DropdownMenuItem>
                                                <DropdownMenuItem on:select={() => goto('/register')}>Register</DropdownMenuItem>
                                        {/if}
                                </DropdownMenuContent>
                        </DropdownMenu>
                </div>
        </div>

        <CollapsibleContent class="sm:hidden border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                <div class="space-y-1 px-2 pt-2 pb-3">
                        {#each navbarList as navbar}
                                <a
                                        href={navbar.link}
                                        class="block rounded-md px-3 py-2 text-base font-medium transition-colors {checkCurrentUrl(page, navbar.link)}"
                                >
                                        {navbar.text}
                                </a>
                        {/each}
                </div>
        </CollapsibleContent>
</Collapsible>

